let orderCount = 1;
const pendingOrders = [];
const completedOrders = [];
const bots = [];

const pendingOrdersList = document.querySelector('.pending-orders .order-list');
const completedOrdersList = document.querySelector('.completed-orders .order-list');
const botsList = document.querySelector('.bots-list');

// create order object
function createOrder(isVip) {
    const id = orderCount++;
    const status = 'pending';
    const startTime = null;
    const processingTime = 10000;
    const completedTime = null;

    return {
        id,
        isVip,
        status,
        startTime,
        processingTime,
        completedTime
    };
}

// create bot object
function createBot(id) {
    const botElement = document.createElement('li');
    botElement.className = 'bot-item idle';

    botElement.innerHTML = `
        <span class="bot-id">Bot #${id}</span>
        <span class="status idle">Idle</span>
    `;

    const botStatus = botElement.querySelector('.status');

    const bot = {
        id: id,
        element: botElement,
        botStatus: botStatus,
        busy: false,
        currentOrder: null,
        timeoutId: null
    };

    return bot;
}

//assign bots to orders
function processOrders() {
    // get orders that are "pending" status
    const filteredPendingOrders = pendingOrders.filter(order => order.status === 'pending');

    // sort normal/vip 
    filteredPendingOrders.sort((a, b) => {
        if (a.isVip === b.isVip) {
            return a.id - b.id;
        }
        return b.isVip - a.isVip;
    });

    // get idle bots
    const idleBots = bots.filter(bot => !bot.busy);

    // assign idle bot to pending order
    for (let i = 0; i < idleBots.length && i < filteredPendingOrders.length; i++) {
        const bot = idleBots[i];
        const order = filteredPendingOrders[i];

        order.status = 'processing';
        order.startTime = Date.now();

        bot.busy = true;
        bot.currentOrder = order;
        updateBotStatus(bot, 'busy');
        updateBotCount();

        bot.timeoutId = setTimeout(() => {
            order.status = 'completed';
            order.completedTime = Date.now();

            bot.busy = false;
            bot.currentOrder = null;
            bot.timeoutId = null;
            updateBotStatus(bot, 'idle');
            updateBotCount();
            const index = pendingOrders.indexOf(order);
            if (index !== -1) {
                pendingOrders.splice(index, 1);
            }
            completedOrders.unshift(order);

            renderOrderLists();
            processOrders();
        }, 10000); //10s
    }
}

function renderOrderLists() {
    renderPendingOrders();
    renderCompletedOrders();
    updateOrderCounts();
}

function renderPendingOrders() {
    pendingOrdersList.innerHTML = '';

    const activeOrders = pendingOrders.filter(order => order.status !== 'completed');
    //sort pending orders 
    activeOrders.sort((a, b) => {
        if (a.status === 'processing' && b.status !== 'processing') {
            return -1;
        }
        if (a.status !== 'processing' && b.status === 'processing') {
            return 1;
        }
        if (a.isVip && !b.isVip) {
            return -1;
        }
        if (!a.isVip && b.isVip) {
            return 1;
        }

        return a.id - b.id;
    });

    for (const order of activeOrders) {
        const orderElement = createOrderElement(order);
        pendingOrdersList.appendChild(orderElement);
    }
}

function renderCompletedOrders() {
    completedOrdersList.innerHTML = '';

    for (let i = 0; i < completedOrders.length; i++) {
        const order = completedOrders[i];
        const orderElement = createOrderElement(order, true);
        completedOrdersList.appendChild(orderElement);
    }
}

//generate order lists
function createOrderElement(order, isCompleted = false) {
    const li = document.createElement('li');
    if (isCompleted) {
        li.className = 'completed-order';
    } else {
        li.className = 'pending-order';
    }
    const orderId = '#' + order.id.toString().padStart(5, '0');
    let displayText = orderId;

    if (order.isVip) {
        displayText = `${orderId} (VIP)`;
    }
    const statusSpan = document.createElement('span');
    statusSpan.className = 'status ' + order.status;
    statusSpan.textContent = order.status.charAt(0).toUpperCase() + order.status.slice(1);

    if (order.status === 'processing') {
        const elapsed = Date.now() - order.startTime;
        const remaining = Math.max(0, order.processingTime - elapsed);
        const seconds = Math.round(remaining / 1000);

        const readyIn = document.createElement('small');
        readyIn.className = 'ready-in';
        readyIn.textContent = `Ready In: ${seconds}s`;

        statusSpan.appendChild(document.createElement('br'));
        statusSpan.appendChild(readyIn);
    }

    li.innerHTML = `<span class="order-id">${displayText}</span>`;
    li.appendChild(statusSpan);

    return li;
}

function updateOrderCounts() {
    const pendingCount = pendingOrders.filter(order => order.status !== 'completed').length;
    const completedCount = completedOrders.length;

    document.getElementById('pendingCount').textContent = `(${pendingCount})`;
    document.getElementById('completedCount').textContent = `(${completedCount})`;
}

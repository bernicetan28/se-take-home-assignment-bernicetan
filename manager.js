// add new bot to the system
function addBot() {
    const newBot = createBot(bots.length + 1);
    bots.push(newBot); // add bot to bots array
    botsList.appendChild(newBot.element); // add bot to bots list
    updateBotCount();
    processOrders();
}

function removeBot() {
    if (bots.length == 0) return;

    const removedBot = bots.pop(); // remove and return last bot from bots array

    if (removedBot.busy) {
        clearTimeout(removedBot.timeoutId);
        const removedOrder = removedBot.currentOrder;
        removedOrder.status = 'pending'; // change the order status of the order the bot was working on back to pending

        const removedOrderIndex = pendingOrders.indexOf(removedOrder);
        if (removedOrderIndex >= 0) {
            pendingOrders.splice(removedOrderIndex, 1);
        }

        if (removedOrder.isVip) {
            pendingOrders.unshift(removedOrder); // adds order to the front of array
            processOrders();
        } else {
            pendingOrders.push(removedOrder); // adds order to the back of the array
        }
    }

    botsList.removeChild(removedBot.element);
    updateBotCount();
    renderOrderLists();
}

function updateBotCount() {
    const total = bots.length;
    const busy = bots.filter(bot => bot.busy).length;
    const idle = total - busy;

    document.getElementById('totalBots').textContent = total;
    document.getElementById('botsBusy').textContent = busy;
    document.getElementById('botsIdle').textContent = idle;
}


function updateBotStatus(bot, status) {
    bot.botStatus.className = 'status ' + status;
    bot.botStatus.textContent = status.charAt(0).toUpperCase() + status.slice(1);
    bot.element.classList.remove('idle', 'busy');
    bot.element.classList.add(status);
}

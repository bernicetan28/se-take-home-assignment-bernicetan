function addOrder(isVip) {
    const newOrder = createOrder(isVip);
    pendingOrders.push(newOrder);
    renderOrderLists();
    processOrders();
}

function addVipOrder() {
    addOrder(true);
}

function addNormalOrder() {
    addOrder(false);
}

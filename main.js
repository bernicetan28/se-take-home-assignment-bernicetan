function showCustomerView() {
    document.getElementById('orderButtons').style.display = 'flex';
    document.getElementById('manageBots').style.display = 'none';
    document.getElementById('customerViewBtn').classList.add('active');
    document.getElementById('managerViewBtn').classList.remove('active');
}

function showManagerView() {
    document.getElementById('orderButtons').style.display = 'none';
    document.getElementById('manageBots').style.display = 'flex';
    document.getElementById('managerViewBtn').classList.add('active');
    document.getElementById('customerViewBtn').classList.remove('active');
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('customerViewBtn').classList.add('active');
    updateBotCount();
});

setInterval(renderOrderLists, 500);

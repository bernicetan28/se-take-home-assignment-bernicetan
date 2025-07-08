# Ordering System Prototype
## Customer View
![image alt](https://github.com/bernicetan28/se-take-home-assignment-bernicetan/blob/a2f06f07e890fc696d2ba8a938114a2513f063c0/Screenshot%202025-07-08%20182418.png)

## Manager View
![image alt](https://github.com/bernicetan28/se-take-home-assignment-bernicetan/blob/a2f06f07e890fc696d2ba8a938114a2513f063c0/Screenshot%202025-07-08%20182352.png)

## Technologies Used
- HTML
- CSS
- JavaScript (no external libraries or frameworks)
  
## Features 
### Orders
- Normal & VIP customers can submit new orders via "New Normal Order" / "New VIP Order" buttons
- Each order has a unique and increasing order number
- VIP orders are placed before all normal orders but after existing VIP orders
- After completion, the order moves to Completed Orders

### Managing Bots
- Add a new bot, which immediately processes the next pending order (if any)
- Removes the newest bot. If it was processing an order, that order returns to Pending
- Bots processes one order at a time (10 seconds per order)
- If no orders remain, bots become Idle until new orders arrive



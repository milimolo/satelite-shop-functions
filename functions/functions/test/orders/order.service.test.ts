// tslint:disable-next-line:no-implicit-dependencies
import {IMock} from "moq.ts";
import {OrderService} from "../../src/orders/order.service";
import {TestHelper} from "../helpers/test.helper";
import {OrderRepository} from "../../src/orders/order.repository";
import {StockRepository} from "../../src/stock/stock.repository";

 describe('OrderService', () => {
    let stockRepository: IMock<StockRepository>;
    let orderRepository: IMock<OrderRepository>;
    let orderService: OrderService;
    let testHelper = new TestHelper();
    beforeEach(() => {
        orderRepository = testHelper.getOrderRepositoryMock();
        stockRepository = testHelper.getStockRepositoryMock();
        orderService = new OrderService(orderRepository.object(), stockRepository.object());
    });

    it('OrderService needs a orderRepository and a stockRepository', () => {
     orderService = new OrderService(orderRepository.object(), stockRepository.object());
     expect(orderService).toBeDefined()
   });


    it('When Executing order I need atleast 1 orderline', () => {
        const order = testHelper.getOrder1();
        order.orderLines = [];
        expect(() => {orderService.removeStock(order)}).toThrow(TypeError);
        expect(() => {orderService.removeStock(order)}).toThrow('You need an order line to execute an order');
    });


});

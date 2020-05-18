import {ProductService} from '../../src/products/product.service';
import {StockRepository} from "../../src/stock/stock.repository";
import {TestHelper} from "../helpers/test.helper";
import {IMock} from 'moq.ts';

describe('ProductService', () => {
  // let productRepository: IMock<ProductRepository>;
  let stockRepo: IMock<StockRepository>;
  let productService: ProductService;
  let testHelper = new TestHelper();
  beforeEach(() => {
      // productRepository = new Mock<ProductRepository>();
      stockRepo = testHelper.getStockRepositoryMock();
      productService = new ProductService(stockRepo.object());
  });

  it('When making new product, it should make a stock document for the product.', async () => {
    const product = testHelper.getProduct1();
    const stock = await productService.createStock(product);
    expect(stock).toBeDefined();
  });


});

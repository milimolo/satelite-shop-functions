import {ProductRepository} from '../../src/products/product.repository';
import {ProductService} from '../../src/products/product.service';
import {StockRepository} from "../../src/stock/stock.repository";
import {TestHelper} from "../helpers/test.helper";
import {IMock, Mock} from 'moq.ts';
import {Stock} from "../../src/models/stock";

describe('ProductService', () => {
  let testHelper: TestHelper;
  let productRepository: IMock<ProductRepository>;
  let stockRepo: IMock<StockRepository>;
  let productService: ProductService;
  beforeEach(() => {
      testHelper = new TestHelper();
      productRepository = new Mock<ProductRepository>()
      stockRepo = testHelper.getStockRepositoryMock();
      productService = new ProductService(stockRepo.object());
  });

  it('When making new product, it should make a stock document for the product.', async () => {
    const product = testHelper.getProduct1();
    const stock = await productService.createStock(product);
    expect(stock).toBeDefined();
  });


});

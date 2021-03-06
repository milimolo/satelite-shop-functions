import {ProductService} from '../../src/products/product.service';
import {StockRepository} from "../../src/stock/stock.repository";
import {TestHelper} from "../helpers/test.helper";
import {IMock} from 'moq.ts';
import {Stock} from "../../src/models/stock";

describe('ProductService', () => {
  // let productRepository: IMock<ProductRepository>;
  let stockRepository: IMock<StockRepository>;
  let stockRepo: IMock<StockRepository>;
  let productService: ProductService;
  let testHelper = new TestHelper();
  beforeEach(() => {
      // productRepository = new Mock<ProductRepository>();
      stockRepo = testHelper.getStockRepositoryMock();
      stockRepository = testHelper.getStockRepositoryMock();
      productService = new ProductService(stockRepo.object());
  });

  it('ProductService needs a stockRepository', () => {
    productService = new ProductService( stockRepository.object());
    expect(productService).toBeDefined()
  });

  it('When making new product, it should make a stock document for the product.', async () => {
    const product = testHelper.getProduct1();
    const stock = await productService.createStock(product);
    expect(stock).toBeDefined();
  });

  it('When making a new stock, its count should be bigger than zero', async () => {
    const product = testHelper.getProduct1();
    const stock: Stock = await productService.createStock(product);
    expect(stock.count).toBeGreaterThan(0);
  });

  it('When changing the name of models it must be a new name', async () => {
    const productBefore = testHelper.getProduct1();
    const productAfter = testHelper.getProduct1();
    expect(() => {productService.renameModelStock(productBefore, productAfter)}).toThrow(TypeError('You cannot reuse the old model name'));
  });

});

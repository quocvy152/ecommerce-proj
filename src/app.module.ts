import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'database/data-source';
import { BrandsModule } from './brands/brands.module';
import { CategoriesModule } from './categories/categories.module';
import { ImagesModule } from './images/images.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { CurrentUserMiddleware } from './utility/middleware/current-user.middleware';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions), 
    UsersModule, 
    CategoriesModule, 
    BrandsModule, 
    ProductsModule, 
    ImagesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CurrentUserMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
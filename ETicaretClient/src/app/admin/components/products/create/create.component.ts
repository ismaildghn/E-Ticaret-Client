import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductsService } from '../../../../services/common/model/products.service';
import { Create_Product } from '../../../contracts/create_product';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService, MessageType, Position } from '../../../../services/admin/alertify.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent extends BaseComponent implements OnInit {

  constructor(private productService: ProductsService, spiner: NgxSpinnerService, private alertify: AlertifyService){
    super(spiner)
  }

  ngOnInit(): void {
     }

     @Output() createdProduct: EventEmitter<Create_Product> = new EventEmitter();

  create(txtName: HTMLInputElement, txtPrice: HTMLInputElement, txtStock: HTMLInputElement){
    this.showSpinner(SpinnerType.BallAtom);
    const create_product: Create_Product = new Create_Product();
    create_product.name = txtName.value;
    create_product.price = parseInt(txtPrice.value);
    create_product.stock = parseFloat(txtStock.value);

    this.productService.create(create_product, () => {
      this.hideSpinner(SpinnerType.BallAtom);
      this.alertify.message("Ürün Başarıyla Eklenmiştir.",{
        dismissOthers: true,
        messageType: MessageType.Success,
        position: Position.TopRight,
      });
      this.createdProduct.emit(create_product);

    }, errorMessage => {
      this.alertify.message(errorMessage, {
        dismissOthers: true,
        messageType: MessageType.Error,
        position: Position.TopLeft
      });
    });
  }
}

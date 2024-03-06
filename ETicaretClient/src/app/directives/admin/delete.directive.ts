import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { ProductsService } from '../../services/common/model/products.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from '../../base/base.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent, DeleteState } from '../../dialogs/delete-dialog/delete-dialog.component';
import { HttpClientService } from '../../services/common/http-client.service';
import { AlertifyOptions, AlertifyService, MessageType, Position } from '../../services/admin/alertify.service';
import { HttpErrorResponse } from '@angular/common/http';

declare var $: any;
@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  constructor(private element: ElementRef, private _renderer: Renderer2, private httpClientService: HttpClientService, private spinner: NgxSpinnerService, public dialog: MatDialog, private alertifyService: AlertifyService) {
    const img = _renderer.createElement("img");
    img.setAttribute("src", "../../../../../assets/delete.png");
    img.setAttribute("style", "cursor: pointer;");
    _renderer.appendChild(element.nativeElement, img);
   }
   
   @Input() id: string;
   @Input() controller: string;
   @Output() callback: EventEmitter<any> = new EventEmitter()
   @HostListener("click")
   async onclick(){
    this.openDialog(async () => {
      this.spinner.show(SpinnerType.BallAtom);
      const td: HTMLTableCellElement = this.element.nativeElement;
      this.httpClientService.delete({
        controller: this.controller
      },this.id).subscribe(data => {
        $(td.parentElement).animate({
          opacity: 0,
          left: "+_50",
          height: "toggle"
        },700, () => {
          this.callback.emit();
          this.alertifyService.message("Ürün başarıyla silinmiştir.",{
            dismissOthers: true,
            messageType: MessageType.Success,
            position: Position.TopRight
          })
        });
      }, (errorResponse: HttpErrorResponse) => {
        this.spinner.hide(SpinnerType.BallAtom);
        this.alertifyService.message("Ürün silme işlemi başarısız.",{
          dismissOthers: true,
          messageType: MessageType.Error,
          position: Position.TopRight
        })
      });
      })
   }
   
   openDialog(afterClosed: any): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: DeleteState.Yes,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result == DeleteState.Yes){
        afterClosed();
      }
    });
  }

}

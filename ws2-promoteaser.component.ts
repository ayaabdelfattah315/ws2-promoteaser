
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TeaserModel } from '../../interfaces/teaser.model';
import { RoutesUtilsService } from '../../../../core/services/routes-utils.service';
/** compoent */
@Component({
  selector: 'ws2promo-teaser',
  templateUrl: './ws2-promoteaser.component.html',
})
/** Ws2PromoTeaserComponent */
export class Ws2PromoTeaserComponent {
  /** teaser Object that will be received as input to the component */
  @Input('teaserObject') public teaserObject: TeaserModel;
  /** redirectToSubmit */
  @Output() public redirectToSubmit: EventEmitter<any> = new EventEmitter();
  constructor ( private routesUtilsService: RoutesUtilsService) { }
  /** navigateSubmit */
   public navigateSubmit (url, target) {
    if (url) {
      this.routesUtilsService.navigateToURL(url, null, target);
    } else {
      this.redirectToSubmit.emit();

      return false;
    }
  }
}

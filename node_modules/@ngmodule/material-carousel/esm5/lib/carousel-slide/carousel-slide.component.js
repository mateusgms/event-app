/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
var MatCarouselSlideComponent = /** @class */ (function () {
    function MatCarouselSlideComponent(sanitizer) {
        this.sanitizer = sanitizer;
        this.overlayColor = '#00000040';
        this.hideOverlay = false;
        this.disabled = false; // implements ListKeyManagerOption
    }
    /**
     * @return {?}
     */
    MatCarouselSlideComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (this.image) {
            this.image = this.sanitizer.bypassSecurityTrustStyle("url(\"" + this.image + "\")");
        }
    };
    MatCarouselSlideComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mat-carousel-slide',
                    template: "<ng-template>\n  <div class=\"carousel-slide\" [style.background-image]=\"image\">\n    <div class=\"carousel-slide-content\"><ng-content></ng-content></div>\n    <div\n      *ngIf=\"!hideOverlay\"\n      class=\"carousel-slide-overlay\"\n      [style.background-color]=\"overlayColor\"\n    ></div>\n  </div>\n</ng-template>\n",
                    styles: [".carousel-slide{width:100%;height:100%;position:absolute;z-index:auto;background-size:cover;background-repeat:no-repeat;background-position:center}.carousel-slide-overlay{width:100%;height:100%;position:absolute;z-index:auto}.carousel-slide-content{width:100%;height:100%;position:absolute;z-index:1}"]
                }] }
    ];
    /** @nocollapse */
    MatCarouselSlideComponent.ctorParameters = function () { return [
        { type: DomSanitizer }
    ]; };
    MatCarouselSlideComponent.propDecorators = {
        image: [{ type: Input }],
        overlayColor: [{ type: Input }],
        hideOverlay: [{ type: Input }],
        disabled: [{ type: Input }],
        templateRef: [{ type: ViewChild, args: [TemplateRef,] }]
    };
    return MatCarouselSlideComponent;
}());
export { MatCarouselSlideComponent };
if (false) {
    /** @type {?} */
    MatCarouselSlideComponent.prototype.image;
    /** @type {?} */
    MatCarouselSlideComponent.prototype.overlayColor;
    /** @type {?} */
    MatCarouselSlideComponent.prototype.hideOverlay;
    /** @type {?} */
    MatCarouselSlideComponent.prototype.disabled;
    /** @type {?} */
    MatCarouselSlideComponent.prototype.templateRef;
    /** @type {?} */
    MatCarouselSlideComponent.prototype.sanitizer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2Fyb3VzZWwtc2xpZGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nbW9kdWxlL21hdGVyaWFsLWNhcm91c2VsLyIsInNvdXJjZXMiOlsibGliL2Nhcm91c2VsLXNsaWRlL2Nhcm91c2VsLXNsaWRlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBRUwsV0FBVyxFQUNYLFNBQVMsRUFDVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsWUFBWSxFQUFhLE1BQU0sMkJBQTJCLENBQUM7QUFJcEU7SUFjRSxtQ0FBbUIsU0FBdUI7UUFBdkIsY0FBUyxHQUFULFNBQVMsQ0FBYztRQU4xQixpQkFBWSxHQUFHLFdBQVcsQ0FBQztRQUMzQixnQkFBVyxHQUFHLEtBQUssQ0FBQztRQUNwQixhQUFRLEdBQUcsS0FBSyxDQUFDLENBQUMsa0NBQWtDO0lBS3BFLENBQUM7Ozs7SUFFTSw0Q0FBUTs7O0lBQWY7UUFDRSxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDZCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsd0JBQXdCLENBQUMsV0FBUSxJQUFJLENBQUMsS0FBSyxRQUFJLENBQUMsQ0FBQztTQUM5RTtJQUNILENBQUM7O2dCQXJCRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLG9CQUFvQjtvQkFDOUIsbVZBQThDOztpQkFFL0M7Ozs7Z0JBUlEsWUFBWTs7O3dCQVdsQixLQUFLOytCQUNMLEtBQUs7OEJBQ0wsS0FBSzsyQkFDTCxLQUFLOzhCQUVMLFNBQVMsU0FBQyxXQUFXOztJQVV4QixnQ0FBQztDQUFBLEFBdEJELElBc0JDO1NBakJZLHlCQUF5Qjs7O0lBRXBDLDBDQUFpQzs7SUFDakMsaURBQTJDOztJQUMzQyxnREFBb0M7O0lBQ3BDLDZDQUFpQzs7SUFFakMsZ0RBQTZEOztJQUVqRCw4Q0FBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMaXN0S2V5TWFuYWdlck9wdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIE9uSW5pdCxcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdDaGlsZFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERvbVNhbml0aXplciwgU2FmZVN0eWxlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5cbmltcG9ydCB7IE1hdENhcm91c2VsU2xpZGUgfSBmcm9tICcuL2Nhcm91c2VsLXNsaWRlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWF0LWNhcm91c2VsLXNsaWRlJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2Nhcm91c2VsLXNsaWRlLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vY2Fyb3VzZWwtc2xpZGUuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBNYXRDYXJvdXNlbFNsaWRlQ29tcG9uZW50XG4gIGltcGxlbWVudHMgTGlzdEtleU1hbmFnZXJPcHRpb24sIE1hdENhcm91c2VsU2xpZGUsIE9uSW5pdCB7XG4gIEBJbnB1dCgpIHB1YmxpYyBpbWFnZTogU2FmZVN0eWxlO1xuICBASW5wdXQoKSBwdWJsaWMgb3ZlcmxheUNvbG9yID0gJyMwMDAwMDA0MCc7XG4gIEBJbnB1dCgpIHB1YmxpYyBoaWRlT3ZlcmxheSA9IGZhbHNlO1xuICBASW5wdXQoKSBwdWJsaWMgZGlzYWJsZWQgPSBmYWxzZTsgLy8gaW1wbGVtZW50cyBMaXN0S2V5TWFuYWdlck9wdGlvblxuXG4gIEBWaWV3Q2hpbGQoVGVtcGxhdGVSZWYpIHB1YmxpYyB0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8YW55PjtcbiAgICBcbiAgY29uc3RydWN0b3IocHVibGljIHNhbml0aXplcjogRG9tU2FuaXRpemVyKSB7XG4gIH1cblxuICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaW1hZ2UpIHtcbiAgICAgIHRoaXMuaW1hZ2UgPSB0aGlzLnNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0U3R5bGUoYHVybChcIiR7dGhpcy5pbWFnZX1cIilgKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==
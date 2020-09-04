/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
export class MatCarouselSlideComponent {
    /**
     * @param {?} sanitizer
     */
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
        this.overlayColor = '#00000040';
        this.hideOverlay = false;
        this.disabled = false; // implements ListKeyManagerOption
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.image) {
            this.image = this.sanitizer.bypassSecurityTrustStyle(`url("${this.image}")`);
        }
    }
}
MatCarouselSlideComponent.decorators = [
    { type: Component, args: [{
                selector: 'mat-carousel-slide',
                template: "<ng-template>\n  <div class=\"carousel-slide\" [style.background-image]=\"image\">\n    <div class=\"carousel-slide-content\"><ng-content></ng-content></div>\n    <div\n      *ngIf=\"!hideOverlay\"\n      class=\"carousel-slide-overlay\"\n      [style.background-color]=\"overlayColor\"\n    ></div>\n  </div>\n</ng-template>\n",
                styles: [".carousel-slide{width:100%;height:100%;position:absolute;z-index:auto;background-size:cover;background-repeat:no-repeat;background-position:center}.carousel-slide-overlay{width:100%;height:100%;position:absolute;z-index:auto}.carousel-slide-content{width:100%;height:100%;position:absolute;z-index:1}"]
            }] }
];
/** @nocollapse */
MatCarouselSlideComponent.ctorParameters = () => [
    { type: DomSanitizer }
];
MatCarouselSlideComponent.propDecorators = {
    image: [{ type: Input }],
    overlayColor: [{ type: Input }],
    hideOverlay: [{ type: Input }],
    disabled: [{ type: Input }],
    templateRef: [{ type: ViewChild, args: [TemplateRef,] }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2Fyb3VzZWwtc2xpZGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nbW9kdWxlL21hdGVyaWFsLWNhcm91c2VsLyIsInNvdXJjZXMiOlsibGliL2Nhcm91c2VsLXNsaWRlL2Nhcm91c2VsLXNsaWRlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBRUwsV0FBVyxFQUNYLFNBQVMsRUFDVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsWUFBWSxFQUFhLE1BQU0sMkJBQTJCLENBQUM7QUFTcEUsTUFBTSxPQUFPLHlCQUF5Qjs7OztJQVNwQyxZQUFtQixTQUF1QjtRQUF2QixjQUFTLEdBQVQsU0FBUyxDQUFjO1FBTjFCLGlCQUFZLEdBQUcsV0FBVyxDQUFDO1FBQzNCLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLGFBQVEsR0FBRyxLQUFLLENBQUMsQ0FBQyxrQ0FBa0M7SUFLcEUsQ0FBQzs7OztJQUVNLFFBQVE7UUFDYixJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDZCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsd0JBQXdCLENBQUMsUUFBUSxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQztTQUM5RTtJQUNILENBQUM7OztZQXJCRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLG9CQUFvQjtnQkFDOUIsbVZBQThDOzthQUUvQzs7OztZQVJRLFlBQVk7OztvQkFXbEIsS0FBSzsyQkFDTCxLQUFLOzBCQUNMLEtBQUs7dUJBQ0wsS0FBSzswQkFFTCxTQUFTLFNBQUMsV0FBVzs7OztJQUx0QiwwQ0FBaUM7O0lBQ2pDLGlEQUEyQzs7SUFDM0MsZ0RBQW9DOztJQUNwQyw2Q0FBaUM7O0lBRWpDLGdEQUE2RDs7SUFFakQsOENBQThCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTGlzdEtleU1hbmFnZXJPcHRpb24gfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPbkluaXQsXG4gIFRlbXBsYXRlUmVmLFxuICBWaWV3Q2hpbGRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEb21TYW5pdGl6ZXIsIFNhZmVTdHlsZSB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG5pbXBvcnQgeyBNYXRDYXJvdXNlbFNsaWRlIH0gZnJvbSAnLi9jYXJvdXNlbC1zbGlkZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21hdC1jYXJvdXNlbC1zbGlkZScsXG4gIHRlbXBsYXRlVXJsOiAnLi9jYXJvdXNlbC1zbGlkZS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2Nhcm91c2VsLXNsaWRlLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgTWF0Q2Fyb3VzZWxTbGlkZUNvbXBvbmVudFxuICBpbXBsZW1lbnRzIExpc3RLZXlNYW5hZ2VyT3B0aW9uLCBNYXRDYXJvdXNlbFNsaWRlLCBPbkluaXQge1xuICBASW5wdXQoKSBwdWJsaWMgaW1hZ2U6IFNhZmVTdHlsZTtcbiAgQElucHV0KCkgcHVibGljIG92ZXJsYXlDb2xvciA9ICcjMDAwMDAwNDAnO1xuICBASW5wdXQoKSBwdWJsaWMgaGlkZU92ZXJsYXkgPSBmYWxzZTtcbiAgQElucHV0KCkgcHVibGljIGRpc2FibGVkID0gZmFsc2U7IC8vIGltcGxlbWVudHMgTGlzdEtleU1hbmFnZXJPcHRpb25cblxuICBAVmlld0NoaWxkKFRlbXBsYXRlUmVmKSBwdWJsaWMgdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPGFueT47XG4gICAgXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBzYW5pdGl6ZXI6IERvbVNhbml0aXplcikge1xuICB9XG5cbiAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmltYWdlKSB7XG4gICAgICB0aGlzLmltYWdlID0gdGhpcy5zYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdFN0eWxlKGB1cmwoXCIke3RoaXMuaW1hZ2V9XCIpYCk7XG4gICAgfVxuICB9XG59XG4iXX0=
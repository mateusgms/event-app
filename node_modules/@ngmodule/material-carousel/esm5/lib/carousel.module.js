/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCarouselComponent } from './carousel.component';
import { MatCarouselSlideComponent } from './carousel-slide/carousel-slide.component';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
// https://github.com/angular/angular/issues/10541#issuecomment-300761387
var 
// https://github.com/angular/angular/issues/10541#issuecomment-300761387
MatCarouselHammerConfig = /** @class */ (function (_super) {
    tslib_1.__extends(MatCarouselHammerConfig, _super);
    function MatCarouselHammerConfig() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.overrides = {
            pinch: { enable: false },
            rotate: { enable: false }
        };
        return _this;
    }
    return MatCarouselHammerConfig;
}(HammerGestureConfig));
// https://github.com/angular/angular/issues/10541#issuecomment-300761387
export { MatCarouselHammerConfig };
if (false) {
    /** @type {?} */
    MatCarouselHammerConfig.prototype.overrides;
}
var MatCarouselModule = /** @class */ (function () {
    function MatCarouselModule() {
    }
    /**
     * @return {?}
     */
    MatCarouselModule.forRoot = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: MatCarouselModule,
            providers: [
                { provide: HAMMER_GESTURE_CONFIG, useClass: MatCarouselHammerConfig }
            ]
        };
    };
    MatCarouselModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [MatCarouselComponent, MatCarouselSlideComponent],
                    imports: [CommonModule, MatButtonModule, MatIconModule],
                    exports: [MatCarouselComponent, MatCarouselSlideComponent]
                },] }
    ];
    return MatCarouselModule;
}());
export { MatCarouselModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2Fyb3VzZWwubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nbW9kdWxlL21hdGVyaWFsLWNhcm91c2VsLyIsInNvdXJjZXMiOlsibGliL2Nhcm91c2VsLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFdkQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDNUQsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDdEYsT0FBTyxFQUNMLG1CQUFtQixFQUNuQixxQkFBcUIsRUFDdEIsTUFBTSwyQkFBMkIsQ0FBQzs7QUFJbkM7OztJQUE2QyxtREFBbUI7SUFBaEU7UUFBQSxxRUFLQztRQUpDLGVBQVMsR0FBRztZQUNWLEtBQUssRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7WUFDeEIsTUFBTSxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTtTQUMxQixDQUFDOztJQUNKLENBQUM7SUFBRCw4QkFBQztBQUFELENBQUMsQUFMRCxDQUE2QyxtQkFBbUIsR0FLL0Q7Ozs7O0lBSkMsNENBR0U7O0FBRUo7SUFBQTtJQWNBLENBQUM7Ozs7SUFSUSx5QkFBTzs7O0lBQWQ7UUFDRSxPQUFPO1lBQ0wsUUFBUSxFQUFFLGlCQUFpQjtZQUMzQixTQUFTLEVBQUU7Z0JBQ1QsRUFBRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsUUFBUSxFQUFFLHVCQUF1QixFQUFFO2FBQ3RFO1NBQ0YsQ0FBQztJQUNKLENBQUM7O2dCQWJGLFFBQVEsU0FBQztvQkFDUixZQUFZLEVBQUUsQ0FBQyxvQkFBb0IsRUFBRSx5QkFBeUIsQ0FBQztvQkFDL0QsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLGVBQWUsRUFBRSxhQUFhLENBQUM7b0JBQ3ZELE9BQU8sRUFBRSxDQUFDLG9CQUFvQixFQUFFLHlCQUF5QixDQUFDO2lCQUMzRDs7SUFVRCx3QkFBQztDQUFBLEFBZEQsSUFjQztTQVRZLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTWF0QnV0dG9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvYnV0dG9uJztcbmltcG9ydCB7IE1hdEljb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9pY29uJztcblxuaW1wb3J0IHsgTWF0Q2Fyb3VzZWxDb21wb25lbnQgfSBmcm9tICcuL2Nhcm91c2VsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXRDYXJvdXNlbFNsaWRlQ29tcG9uZW50IH0gZnJvbSAnLi9jYXJvdXNlbC1zbGlkZS9jYXJvdXNlbC1zbGlkZS5jb21wb25lbnQnO1xuaW1wb3J0IHtcbiAgSGFtbWVyR2VzdHVyZUNvbmZpZyxcbiAgSEFNTUVSX0dFU1RVUkVfQ09ORklHXG59IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHsgTW9kdWxlV2l0aFByb3ZpZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvbXBpbGVyL3NyYy9jb3JlJztcblxuLy8gaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvMTA1NDEjaXNzdWVjb21tZW50LTMwMDc2MTM4N1xuZXhwb3J0IGNsYXNzIE1hdENhcm91c2VsSGFtbWVyQ29uZmlnIGV4dGVuZHMgSGFtbWVyR2VzdHVyZUNvbmZpZyB7XG4gIG92ZXJyaWRlcyA9IHtcbiAgICBwaW5jaDogeyBlbmFibGU6IGZhbHNlIH0sXG4gICAgcm90YXRlOiB7IGVuYWJsZTogZmFsc2UgfVxuICB9O1xufVxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbTWF0Q2Fyb3VzZWxDb21wb25lbnQsIE1hdENhcm91c2VsU2xpZGVDb21wb25lbnRdLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBNYXRCdXR0b25Nb2R1bGUsIE1hdEljb25Nb2R1bGVdLFxuICBleHBvcnRzOiBbTWF0Q2Fyb3VzZWxDb21wb25lbnQsIE1hdENhcm91c2VsU2xpZGVDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIE1hdENhcm91c2VsTW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBNYXRDYXJvdXNlbE1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7IHByb3ZpZGU6IEhBTU1FUl9HRVNUVVJFX0NPTkZJRywgdXNlQ2xhc3M6IE1hdENhcm91c2VsSGFtbWVyQ29uZmlnIH1cbiAgICAgIF1cbiAgICB9O1xuICB9XG59XG4iXX0=
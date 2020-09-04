import { Component, Input, TemplateRef, ViewChild, ContentChildren, EventEmitter, HostListener, Inject, Output, PLATFORM_ID, Renderer2, NgModule } from '@angular/core';
import { DomSanitizer, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { animate, style, AnimationBuilder } from '@angular/animations';
import { ListKeyManager } from '@angular/cdk/a11y';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { interval, BehaviorSubject, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class MatCarouselSlideComponent {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {number} */
const Direction = {
    Left: 0,
    Right: 1,
    Index: 2,
};
Direction[Direction.Left] = 'Left';
Direction[Direction.Right] = 'Right';
Direction[Direction.Index] = 'Index';
class MatCarouselComponent {
    /**
     * @param {?} animationBuilder
     * @param {?} renderer
     * @param {?} platformId
     */
    constructor(animationBuilder, renderer, platformId) {
        this.animationBuilder = animationBuilder;
        this.renderer = renderer;
        this.platformId = platformId;
        this.timings = '250ms ease-in';
        this.hideArrows = true;
        this.hideIndicators = true;
        this.color = 'accent';
        this.maintainAspectRatio = true;
        this.proportion = 25;
        this.slideHeight = '100%';
        this.useKeyboard = false;
        this.useMouseWheel = false;
        this.change = new EventEmitter();
        this._autoplay = true;
        this.autoplay$ = new Subject();
        this.interval$ = new BehaviorSubject(5000);
        this.slides$ = new BehaviorSubject(null);
        this._maxWidth = 'auto';
        this.maxWidth$ = new Subject();
        this._loop = true;
        this.loop$ = new Subject();
        this._orientation = 'ltr';
        this.orientation$ = new Subject();
        this.timerStop$ = new Subject();
        this.destroy$ = new Subject();
        this.playing = false;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set autoplay(value) {
        this.autoplay$.next(value);
        this._autoplay = value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set interval(value) {
        this.interval$.next(value);
    }
    /**
     * @return {?}
     */
    get loop() {
        return this._loop;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set loop(value) {
        this.loop$.next(value);
        this._loop = value;
    }
    /**
     * @return {?}
     */
    get maxWidth() {
        return this._maxWidth;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set maxWidth(value) {
        this._maxWidth = value;
        this.maxWidth$.next();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set slides(value) {
        this.slides$.next(value);
    }
    /**
     * @return {?}
     */
    get orientation() {
        return this._orientation;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set orientation(value) {
        this.orientation$.next(value);
        this._orientation = value;
    }
    /**
     * @return {?}
     */
    get currentIndex() {
        if (this.listKeyManager) {
            return this.listKeyManager.activeItemIndex;
        }
        return 0;
    }
    /**
     * @return {?}
     */
    get currentSlide() {
        if (this.listKeyManager) {
            return this.listKeyManager.activeItem;
        }
        return null;
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this.listKeyManager = new ListKeyManager(this.slidesList)
            .withVerticalOrientation(false)
            .withHorizontalOrientation(this._orientation)
            .withWrap(this._loop);
        this.listKeyManager.updateActiveItem(0);
        this.listKeyManager.change
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => this.playAnimation());
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.autoplay$.pipe(takeUntil(this.destroy$)).subscribe(value => {
            this.stopTimer();
            this.startTimer(value);
        });
        this.interval$.pipe(takeUntil(this.destroy$)).subscribe(value => {
            this.stopTimer();
            this.resetTimer(value);
            this.startTimer(this._autoplay);
        });
        this.maxWidth$
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => this.slideTo(0));
        this.loop$
            .pipe(takeUntil(this.destroy$))
            .subscribe(value => this.listKeyManager.withWrap(value));
        this.orientation$
            .pipe(takeUntil(this.destroy$))
            .subscribe(value => this.listKeyManager.withHorizontalOrientation(value));
        this.slides$
            .pipe(takeUntil(this.destroy$), filter(value => value && value < this.slidesList.length))
            .subscribe(value => this.resetSlides(value));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    /**
     * @return {?}
     */
    next() {
        this.goto(Direction.Right);
    }
    /**
     * @return {?}
     */
    previous() {
        this.goto(Direction.Left);
    }
    /**
     * @param {?} index
     * @return {?}
     */
    slideTo(index) {
        this.goto(Direction.Index, index);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onKeyUp(event) {
        if (this.useKeyboard && !this.playing) {
            this.listKeyManager.onKeydown(event);
        }
    }
    /**
     * @return {?}
     */
    onMouseEnter() {
        this.stopTimer();
    }
    /**
     * @return {?}
     */
    onMouseLeave() {
        this.startTimer(this._autoplay);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onMouseWheel(event) {
        if (this.useMouseWheel) {
            event.preventDefault(); // prevent window to scroll
            // prevent window to scroll
            /** @type {?} */
            const Δ = Math.sign(event.wheelDelta);
            if (Δ < 0) {
                this.next();
            }
            else if (Δ > 0) {
                this.previous();
            }
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onResize(event) {
        // Reset carousel when window is resized
        // in order to avoid major glitches.
        this.slideTo(0);
    }
    /**
     * @param {?} event
     * @param {?} slideElem
     * @return {?}
     */
    onPan(event, slideElem) {
        // https://github.com/angular/angular/issues/10541#issuecomment-346539242
        // if y velocity is greater, it's a panup/pandown, so ignore.
        if (Math.abs(event.velocityY) > Math.abs(event.velocityX)) {
            return;
        }
        /** @type {?} */
        let Δx = event.deltaX;
        if (this.isOutOfBounds()) {
            Δx *= 0.2; // decelerate movement;
        }
        this.renderer.setStyle(slideElem, 'cursor', 'grabbing');
        this.renderer.setStyle(this.carouselList.nativeElement, 'transform', this.getTranslation(this.getOffset() + Δx));
    }
    /**
     * @param {?} event
     * @param {?} slideElem
     * @return {?}
     */
    onPanEnd(event, slideElem) {
        this.renderer.removeStyle(slideElem, 'cursor');
        if (!this.isOutOfBounds() &&
            Math.abs(event.deltaX) > this.getWidth() * 0.25) {
            if (event.deltaX <= 0) {
                this.next();
                return;
            }
            this.previous();
            return;
        }
        this.playAnimation(); // slide back, don't change current index
    }
    /**
     * @private
     * @return {?}
     */
    isOutOfBounds() {
        /** @type {?} */
        const sign = this.orientation === 'rtl' ? -1 : 1;
        /** @type {?} */
        const left = sign *
            (this.carouselList.nativeElement.getBoundingClientRect().left -
                this.carouselList.nativeElement.offsetParent.getBoundingClientRect()
                    .left);
        /** @type {?} */
        const lastIndex = this.slidesList.length - 1;
        /** @type {?} */
        const width = -this.getWidth() * lastIndex;
        return ((this.listKeyManager.activeItemIndex === 0 && left >= 0) ||
            (this.listKeyManager.activeItemIndex === lastIndex && left <= width));
    }
    /**
     * @private
     * @return {?}
     */
    isVisible() {
        if (!isPlatformBrowser(this.platformId)) {
            return false;
        }
        /** @type {?} */
        const elem = this.carouselContainer.nativeElement;
        /** @type {?} */
        const docViewTop = window.pageYOffset;
        /** @type {?} */
        const docViewBottom = docViewTop + window.innerHeight;
        /** @type {?} */
        const elemOffset = elem.getBoundingClientRect();
        /** @type {?} */
        const elemTop = docViewTop + elemOffset.top;
        /** @type {?} */
        const elemBottom = elemTop + elemOffset.height;
        return elemBottom <= docViewBottom || elemTop >= docViewTop;
    }
    /**
     * @private
     * @return {?}
     */
    getOffset() {
        /** @type {?} */
        const offset = this.listKeyManager.activeItemIndex * this.getWidth();
        /** @type {?} */
        const sign = this.orientation === 'rtl' ? 1 : -1;
        return sign * offset;
    }
    /**
     * @private
     * @param {?} offset
     * @return {?}
     */
    getTranslation(offset) {
        return `translateX(${offset}px)`;
    }
    /**
     * @private
     * @return {?}
     */
    getWidth() {
        return this.carouselContainer.nativeElement.clientWidth;
    }
    /**
     * @private
     * @param {?} direction
     * @param {?=} index
     * @return {?}
     */
    goto(direction, index) {
        if (!this.playing) {
            /** @type {?} */
            const rtl = this.orientation === 'rtl';
            switch (direction) {
                case Direction.Left:
                    return rtl
                        ? this.listKeyManager.setNextItemActive()
                        : this.listKeyManager.setPreviousItemActive();
                case Direction.Right:
                    return rtl
                        ? this.listKeyManager.setPreviousItemActive()
                        : this.listKeyManager.setNextItemActive();
                case Direction.Index:
                    return this.listKeyManager.setActiveItem(index);
            }
        }
    }
    /**
     * @private
     * @return {?}
     */
    playAnimation() {
        /** @type {?} */
        const translation = this.getTranslation(this.getOffset());
        /** @type {?} */
        const factory = this.animationBuilder.build(animate(this.timings, style({ transform: translation })));
        /** @type {?} */
        const animation = factory.create(this.carouselList.nativeElement);
        animation.onStart(() => (this.playing = true));
        animation.onDone(() => {
            this.change.emit(this.currentIndex);
            this.playing = false;
            this.renderer.setStyle(this.carouselList.nativeElement, 'transform', translation);
            animation.destroy();
        });
        animation.play();
    }
    /**
     * @private
     * @param {?} slides
     * @return {?}
     */
    resetSlides(slides) {
        this.slidesList.reset(this.slidesList.toArray().slice(0, slides));
    }
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    resetTimer(value) {
        this.timer$ = interval(value);
    }
    /**
     * @private
     * @param {?} autoplay
     * @return {?}
     */
    startTimer(autoplay) {
        if (!autoplay) {
            return;
        }
        this.timer$
            .pipe(takeUntil(this.timerStop$), takeUntil(this.destroy$), filter(() => this.isVisible()))
            .subscribe(() => {
            this.listKeyManager.withWrap(true).setNextItemActive();
            this.listKeyManager.withWrap(this.loop);
        });
    }
    /**
     * @private
     * @return {?}
     */
    stopTimer() {
        this.timerStop$.next();
    }
}
MatCarouselComponent.decorators = [
    { type: Component, args: [{
                selector: 'mat-carousel',
                template: "<div\n  #carouselContainer\n  class=\"carousel\"\n  tabindex=\"0\"\n  [style.max-width]=\"maxWidth\"\n  [style.height]=\"!maintainAspectRatio ? '100%' : 'auto'\"\n>\n  <ul\n    #carouselList\n    class=\"carousel-list\"\n    role=\"listbox\"\n    [style.flex-direction]=\"orientation === 'rtl' ? 'row-reverse' : 'row'\"\n    [style.height]=\"!maintainAspectRatio ? '100%' : 'auto'\"\n  >\n    <li\n      #carouselSlide\n      *ngFor=\"let slide of slidesList\"\n      class=\"carousel-slide\"\n      role=\"option\"\n      [style.padding-bottom]=\"maintainAspectRatio && proportion ? proportion + '%': '0px'\"\n      [style.height]=\"!maintainAspectRatio && slideHeight ? slideHeight : '0px'\"\n      (panleft)=\"onPan($event, carouselSlide)\"\n      (panright)=\"onPan($event, carouselSlide)\"\n      (panend)=\"onPanEnd($event, carouselSlide)\"\n      (pancancel)=\"onPanEnd($event, carouselSlide)\"\n    >\n      <ng-container [ngTemplateOutlet]=\"slide.templateRef\"></ng-container>\n    </li>\n  </ul>\n\n  <button\n    *ngIf=\"!hideArrows\"\n    mat-icon-button\n    type=\"button\"\n    tabindex=\"-1\"\n    [color]=\"color\"\n    [disabled]=\"!loop && currentIndex == 0\"\n    (click)=\"previous()\"\n  >\n    <mat-icon\n      *ngIf=\"svgIconOverrides?.arrowBack; else: defaultArrowBack\"\n      [svgIcon]=\"svgIconOverrides.arrowBack\"\n    ></mat-icon>\n    <ng-template #defaultArrowBack>\n      <mat-icon>arrow_back</mat-icon>\n    </ng-template>\n  </button>\n  <button\n    *ngIf=\"!hideArrows\"\n    mat-icon-button\n    type=\"button\"\n    tabindex=\"-1\"\n    [color]=\"color\"\n    [disabled]=\"!loop && currentIndex == slidesList.length - 1\"\n    (click)=\"next()\"\n  >\n    <mat-icon\n      *ngIf=\"svgIconOverrides?.arrowForward; else: defaultArrowForward\"\n      [svgIcon]=\"svgIconOverrides.arrowForward\"\n    ></mat-icon>\n    <ng-template #defaultArrowForward>\n      <mat-icon>arrow_forward</mat-icon>\n    </ng-template>\n  </button>\n\n  <div\n    *ngIf=\"!hideIndicators\"\n    class=\"carousel-indicators\"\n    tabindex=\"-1\"\n    [style.flex-direction]=\"orientation === 'rtl' ? 'row-reverse' : 'row'\"\n  >\n    <button\n      *ngFor=\"let slide of slidesList; let i = index\"\n      type=\"button\"\n      tabindex=\"-1\"\n      mat-mini-fab\n      [color]=\"color\"\n      [disabled]=\"i == currentIndex\"\n      (click)=\"slideTo(i)\"\n      (focus)=\"carouselContainer.focus()\"\n    ></button>\n  </div>\n</div>\n",
                styles: [".carousel{width:100%;position:relative;overflow:hidden;outline:0}.carousel>button{position:absolute;z-index:1;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%)}.carousel>button:first-of-type{left:30px}.carousel>button:last-of-type{right:30px}.carousel-list{width:100%;margin:0;padding:0;list-style:none;display:flex;position:relative}.carousel-slide{width:100%;height:0;display:flex;flex-shrink:0;position:relative}.carousel-slide:hover{cursor:-webkit-grab;cursor:grab}.carousel-indicators{display:flex;position:absolute;bottom:15px;z-index:1;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%);outline:0}.carousel-indicators>button{width:10px;height:10px;margin:7.5px}"]
            }] }
];
/** @nocollapse */
MatCarouselComponent.ctorParameters = () => [
    { type: AnimationBuilder },
    { type: Renderer2 },
    { type: undefined, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
];
MatCarouselComponent.propDecorators = {
    timings: [{ type: Input }],
    svgIconOverrides: [{ type: Input }],
    autoplay: [{ type: Input }],
    interval: [{ type: Input }],
    loop: [{ type: Input }],
    hideArrows: [{ type: Input }],
    hideIndicators: [{ type: Input }],
    color: [{ type: Input }],
    maxWidth: [{ type: Input }],
    maintainAspectRatio: [{ type: Input }],
    proportion: [{ type: Input }],
    slideHeight: [{ type: Input }],
    slides: [{ type: Input }],
    useKeyboard: [{ type: Input }],
    useMouseWheel: [{ type: Input }],
    orientation: [{ type: Input }],
    change: [{ type: Output }],
    slidesList: [{ type: ContentChildren, args: [MatCarouselSlideComponent,] }],
    carouselContainer: [{ type: ViewChild, args: ['carouselContainer',] }],
    carouselList: [{ type: ViewChild, args: ['carouselList',] }],
    onKeyUp: [{ type: HostListener, args: ['keyup', ['$event'],] }],
    onMouseEnter: [{ type: HostListener, args: ['mouseenter',] }],
    onMouseLeave: [{ type: HostListener, args: ['mouseleave',] }],
    onMouseWheel: [{ type: HostListener, args: ['mousewheel', ['$event'],] }],
    onResize: [{ type: HostListener, args: ['window:resize', ['$event'],] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// https://github.com/angular/angular/issues/10541#issuecomment-300761387
class MatCarouselHammerConfig extends HammerGestureConfig {
    constructor() {
        super(...arguments);
        this.overrides = {
            pinch: { enable: false },
            rotate: { enable: false }
        };
    }
}
class MatCarouselModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: MatCarouselModule,
            providers: [
                { provide: HAMMER_GESTURE_CONFIG, useClass: MatCarouselHammerConfig }
            ]
        };
    }
}
MatCarouselModule.decorators = [
    { type: NgModule, args: [{
                declarations: [MatCarouselComponent, MatCarouselSlideComponent],
                imports: [CommonModule, MatButtonModule, MatIconModule],
                exports: [MatCarouselComponent, MatCarouselSlideComponent]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { MatCarouselComponent, MatCarouselHammerConfig, MatCarouselModule, MatCarouselSlideComponent };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdtb2R1bGUtbWF0ZXJpYWwtY2Fyb3VzZWwuanMubWFwIiwic291cmNlcyI6WyJuZzovL0BuZ21vZHVsZS9tYXRlcmlhbC1jYXJvdXNlbC9saWIvY2Fyb3VzZWwtc2xpZGUvY2Fyb3VzZWwtc2xpZGUuY29tcG9uZW50LnRzIiwibmc6Ly9Abmdtb2R1bGUvbWF0ZXJpYWwtY2Fyb3VzZWwvbGliL2Nhcm91c2VsLmNvbXBvbmVudC50cyIsIm5nOi8vQG5nbW9kdWxlL21hdGVyaWFsLWNhcm91c2VsL2xpYi9jYXJvdXNlbC5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTGlzdEtleU1hbmFnZXJPcHRpb24gfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPbkluaXQsXG4gIFRlbXBsYXRlUmVmLFxuICBWaWV3Q2hpbGRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEb21TYW5pdGl6ZXIsIFNhZmVTdHlsZSB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG5pbXBvcnQgeyBNYXRDYXJvdXNlbFNsaWRlIH0gZnJvbSAnLi9jYXJvdXNlbC1zbGlkZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21hdC1jYXJvdXNlbC1zbGlkZScsXG4gIHRlbXBsYXRlVXJsOiAnLi9jYXJvdXNlbC1zbGlkZS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2Nhcm91c2VsLXNsaWRlLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgTWF0Q2Fyb3VzZWxTbGlkZUNvbXBvbmVudFxuICBpbXBsZW1lbnRzIExpc3RLZXlNYW5hZ2VyT3B0aW9uLCBNYXRDYXJvdXNlbFNsaWRlLCBPbkluaXQge1xuICBASW5wdXQoKSBwdWJsaWMgaW1hZ2U6IFNhZmVTdHlsZTtcbiAgQElucHV0KCkgcHVibGljIG92ZXJsYXlDb2xvciA9ICcjMDAwMDAwNDAnO1xuICBASW5wdXQoKSBwdWJsaWMgaGlkZU92ZXJsYXkgPSBmYWxzZTtcbiAgQElucHV0KCkgcHVibGljIGRpc2FibGVkID0gZmFsc2U7IC8vIGltcGxlbWVudHMgTGlzdEtleU1hbmFnZXJPcHRpb25cblxuICBAVmlld0NoaWxkKFRlbXBsYXRlUmVmKSBwdWJsaWMgdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPGFueT47XG4gICAgXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBzYW5pdGl6ZXI6IERvbVNhbml0aXplcikge1xuICB9XG5cbiAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmltYWdlKSB7XG4gICAgICB0aGlzLmltYWdlID0gdGhpcy5zYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdFN0eWxlKGB1cmwoXCIke3RoaXMuaW1hZ2V9XCIpYCk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBhbmltYXRlLCBzdHlsZSwgQW5pbWF0aW9uQnVpbGRlciB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgTGlzdEtleU1hbmFnZXIgfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICBBZnRlckNvbnRlbnRJbml0LFxuICBBZnRlclZpZXdJbml0LFxuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0TGlzdGVuZXIsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT3V0cHV0LFxuICBQTEFURk9STV9JRCxcbiAgUXVlcnlMaXN0LFxuICBSZW5kZXJlcjIsXG4gIFZpZXdDaGlsZFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRoZW1lUGFsZXR0ZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuaW1wb3J0IHsgaW50ZXJ2YWwsIEJlaGF2aW9yU3ViamVjdCwgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IE1hdENhcm91c2VsLCBPcmllbnRhdGlvbiwgU3ZnSWNvbk92ZXJyaWRlcyB9IGZyb20gJy4vY2Fyb3VzZWwnO1xuaW1wb3J0IHsgTWF0Q2Fyb3VzZWxTbGlkZUNvbXBvbmVudCB9IGZyb20gJy4vY2Fyb3VzZWwtc2xpZGUvY2Fyb3VzZWwtc2xpZGUuY29tcG9uZW50JztcblxuZW51bSBEaXJlY3Rpb24ge1xuICBMZWZ0LFxuICBSaWdodCxcbiAgSW5kZXhcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWF0LWNhcm91c2VsJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2Nhcm91c2VsLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vY2Fyb3VzZWwuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBNYXRDYXJvdXNlbENvbXBvbmVudFxuICBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIEFmdGVyVmlld0luaXQsIE1hdENhcm91c2VsLCBPbkRlc3Ryb3kge1xuICBASW5wdXQoKSBwdWJsaWMgdGltaW5ncyA9ICcyNTBtcyBlYXNlLWluJztcbiAgQElucHV0KCkgcHVibGljIHN2Z0ljb25PdmVycmlkZXM6IFN2Z0ljb25PdmVycmlkZXM7XG5cbiAgQElucHV0KClcbiAgcHVibGljIHNldCBhdXRvcGxheSh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuYXV0b3BsYXkkLm5leHQodmFsdWUpO1xuICAgIHRoaXMuX2F1dG9wbGF5ID0gdmFsdWU7XG4gIH1cblxuICBASW5wdXQoKVxuICBwdWJsaWMgc2V0IGludGVydmFsKHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLmludGVydmFsJC5uZXh0KHZhbHVlKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgbG9vcCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fbG9vcDtcbiAgfVxuICBASW5wdXQoKVxuICBwdWJsaWMgc2V0IGxvb3AodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLmxvb3AkLm5leHQodmFsdWUpO1xuICAgIHRoaXMuX2xvb3AgPSB2YWx1ZTtcbiAgfVxuXG4gIEBJbnB1dCgpIHB1YmxpYyBoaWRlQXJyb3dzID0gdHJ1ZTtcbiAgQElucHV0KCkgcHVibGljIGhpZGVJbmRpY2F0b3JzID0gdHJ1ZTtcbiAgQElucHV0KCkgcHVibGljIGNvbG9yOiBUaGVtZVBhbGV0dGUgPSAnYWNjZW50JztcblxuICBwdWJsaWMgZ2V0IG1heFdpZHRoKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX21heFdpZHRoO1xuICB9XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBzZXQgbWF4V2lkdGgodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuX21heFdpZHRoID0gdmFsdWU7XG4gICAgdGhpcy5tYXhXaWR0aCQubmV4dCgpO1xuICB9XG5cbiAgQElucHV0KCkgcHVibGljIG1haW50YWluQXNwZWN0UmF0aW8gPSB0cnVlO1xuICBASW5wdXQoKSBwdWJsaWMgcHJvcG9ydGlvbiA9IDI1O1xuICBASW5wdXQoKSBwdWJsaWMgc2xpZGVIZWlnaHQgPSAnMTAwJSc7XG5cbiAgQElucHV0KClcbiAgcHVibGljIHNldCBzbGlkZXModmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMuc2xpZGVzJC5uZXh0KHZhbHVlKTtcbiAgfVxuXG4gIEBJbnB1dCgpIHB1YmxpYyB1c2VLZXlib2FyZCA9IGZhbHNlO1xuICBASW5wdXQoKSBwdWJsaWMgdXNlTW91c2VXaGVlbCA9IGZhbHNlO1xuXG4gIHB1YmxpYyBnZXQgb3JpZW50YXRpb24oKTogT3JpZW50YXRpb24ge1xuICAgIHJldHVybiB0aGlzLl9vcmllbnRhdGlvbjtcbiAgfVxuICBASW5wdXQoKVxuICBwdWJsaWMgc2V0IG9yaWVudGF0aW9uKHZhbHVlOiBPcmllbnRhdGlvbikge1xuICAgIHRoaXMub3JpZW50YXRpb24kLm5leHQodmFsdWUpO1xuICAgIHRoaXMuX29yaWVudGF0aW9uID0gdmFsdWU7XG4gIH1cblxuICBAT3V0cHV0KClcbiAgcHVibGljIGNoYW5nZTogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcblxuICBwdWJsaWMgZ2V0IGN1cnJlbnRJbmRleCgpOiBudW1iZXIge1xuICAgIGlmICh0aGlzLmxpc3RLZXlNYW5hZ2VyKSB7XG4gICAgICByZXR1cm4gdGhpcy5saXN0S2V5TWFuYWdlci5hY3RpdmVJdGVtSW5kZXg7XG4gICAgfVxuXG4gICAgcmV0dXJuIDA7XG4gIH1cbiAgcHVibGljIGdldCBjdXJyZW50U2xpZGUoKTogTWF0Q2Fyb3VzZWxTbGlkZUNvbXBvbmVudCB7XG4gICAgaWYgKHRoaXMubGlzdEtleU1hbmFnZXIpIHtcbiAgICAgIHJldHVybiB0aGlzLmxpc3RLZXlNYW5hZ2VyLmFjdGl2ZUl0ZW07XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBAQ29udGVudENoaWxkcmVuKE1hdENhcm91c2VsU2xpZGVDb21wb25lbnQpIHB1YmxpYyBzbGlkZXNMaXN0OiBRdWVyeUxpc3Q8XG4gICAgTWF0Q2Fyb3VzZWxTbGlkZUNvbXBvbmVudFxuICA+O1xuICBAVmlld0NoaWxkKCdjYXJvdXNlbENvbnRhaW5lcicpIHByaXZhdGUgY2Fyb3VzZWxDb250YWluZXI6IEVsZW1lbnRSZWY8XG4gICAgSFRNTERpdkVsZW1lbnRcbiAgPjtcbiAgQFZpZXdDaGlsZCgnY2Fyb3VzZWxMaXN0JykgcHJpdmF0ZSBjYXJvdXNlbExpc3Q6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+O1xuICBwdWJsaWMgbGlzdEtleU1hbmFnZXI6IExpc3RLZXlNYW5hZ2VyPE1hdENhcm91c2VsU2xpZGVDb21wb25lbnQ+O1xuXG4gIHByaXZhdGUgX2F1dG9wbGF5ID0gdHJ1ZTtcbiAgcHJpdmF0ZSBhdXRvcGxheSQgPSBuZXcgU3ViamVjdDxib29sZWFuPigpO1xuXG4gIHByaXZhdGUgaW50ZXJ2YWwkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDUwMDApO1xuICBwcml2YXRlIHNsaWRlcyQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4obnVsbCk7XG5cbiAgcHJpdmF0ZSBfbWF4V2lkdGggPSAnYXV0byc7XG4gIHByaXZhdGUgbWF4V2lkdGgkID0gbmV3IFN1YmplY3Q8bmV2ZXI+KCk7XG5cbiAgcHJpdmF0ZSBfbG9vcCA9IHRydWU7XG4gIHByaXZhdGUgbG9vcCQgPSBuZXcgU3ViamVjdDxib29sZWFuPigpO1xuXG4gIHByaXZhdGUgX29yaWVudGF0aW9uOiBPcmllbnRhdGlvbiA9ICdsdHInO1xuICBwcml2YXRlIG9yaWVudGF0aW9uJCA9IG5ldyBTdWJqZWN0PE9yaWVudGF0aW9uPigpO1xuXG4gIHByaXZhdGUgdGltZXIkOiBPYnNlcnZhYmxlPG51bWJlcj47XG4gIHByaXZhdGUgdGltZXJTdG9wJCA9IG5ldyBTdWJqZWN0PG5ldmVyPigpO1xuXG4gIHByaXZhdGUgZGVzdHJveSQgPSBuZXcgU3ViamVjdDxuZXZlcj4oKTtcbiAgcHJpdmF0ZSBwbGF5aW5nID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBhbmltYXRpb25CdWlsZGVyOiBBbmltYXRpb25CdWlsZGVyLFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWRcbiAgKSB7fVxuXG4gIHB1YmxpYyBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5saXN0S2V5TWFuYWdlciA9IG5ldyBMaXN0S2V5TWFuYWdlcih0aGlzLnNsaWRlc0xpc3QpXG4gICAgICAud2l0aFZlcnRpY2FsT3JpZW50YXRpb24oZmFsc2UpXG4gICAgICAud2l0aEhvcml6b250YWxPcmllbnRhdGlvbih0aGlzLl9vcmllbnRhdGlvbilcbiAgICAgIC53aXRoV3JhcCh0aGlzLl9sb29wKTtcblxuICAgIHRoaXMubGlzdEtleU1hbmFnZXIudXBkYXRlQWN0aXZlSXRlbSgwKTtcbiAgICB0aGlzLmxpc3RLZXlNYW5hZ2VyLmNoYW5nZVxuICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLnBsYXlBbmltYXRpb24oKSk7XG4gIH1cblxuICBwdWJsaWMgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHRoaXMuYXV0b3BsYXkkLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKS5zdWJzY3JpYmUodmFsdWUgPT4ge1xuICAgICAgdGhpcy5zdG9wVGltZXIoKTtcbiAgICAgIHRoaXMuc3RhcnRUaW1lcih2YWx1ZSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmludGVydmFsJC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSkuc3Vic2NyaWJlKHZhbHVlID0+IHtcbiAgICAgIHRoaXMuc3RvcFRpbWVyKCk7XG4gICAgICB0aGlzLnJlc2V0VGltZXIodmFsdWUpO1xuICAgICAgdGhpcy5zdGFydFRpbWVyKHRoaXMuX2F1dG9wbGF5KTtcbiAgICB9KTtcblxuICAgIHRoaXMubWF4V2lkdGgkXG4gICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuc2xpZGVUbygwKSk7XG5cbiAgICB0aGlzLmxvb3AkXG4gICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpXG4gICAgICAuc3Vic2NyaWJlKHZhbHVlID0+IHRoaXMubGlzdEtleU1hbmFnZXIud2l0aFdyYXAodmFsdWUpKTtcblxuICAgIHRoaXMub3JpZW50YXRpb24kXG4gICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpXG4gICAgICAuc3Vic2NyaWJlKHZhbHVlID0+IHRoaXMubGlzdEtleU1hbmFnZXIud2l0aEhvcml6b250YWxPcmllbnRhdGlvbih2YWx1ZSkpO1xuXG4gICAgdGhpcy5zbGlkZXMkXG4gICAgICAucGlwZShcbiAgICAgICAgdGFrZVVudGlsKHRoaXMuZGVzdHJveSQpLFxuICAgICAgICBmaWx0ZXIodmFsdWUgPT4gdmFsdWUgJiYgdmFsdWUgPCB0aGlzLnNsaWRlc0xpc3QubGVuZ3RoKVxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSh2YWx1ZSA9PiB0aGlzLnJlc2V0U2xpZGVzKHZhbHVlKSk7XG4gIH1cblxuICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5kZXN0cm95JC5uZXh0KCk7XG4gICAgdGhpcy5kZXN0cm95JC5jb21wbGV0ZSgpO1xuICB9XG5cbiAgcHVibGljIG5leHQoKTogdm9pZCB7XG4gICAgdGhpcy5nb3RvKERpcmVjdGlvbi5SaWdodCk7XG4gIH1cblxuICBwdWJsaWMgcHJldmlvdXMoKTogdm9pZCB7XG4gICAgdGhpcy5nb3RvKERpcmVjdGlvbi5MZWZ0KTtcbiAgfVxuXG4gIHB1YmxpYyBzbGlkZVRvKGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLmdvdG8oRGlyZWN0aW9uLkluZGV4LCBpbmRleCk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdrZXl1cCcsIFsnJGV2ZW50J10pXG4gIHB1YmxpYyBvbktleVVwKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgaWYgKHRoaXMudXNlS2V5Ym9hcmQgJiYgIXRoaXMucGxheWluZykge1xuICAgICAgdGhpcy5saXN0S2V5TWFuYWdlci5vbktleWRvd24oZXZlbnQpO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlZW50ZXInKVxuICBwdWJsaWMgb25Nb3VzZUVudGVyKCk6IHZvaWQge1xuICAgIHRoaXMuc3RvcFRpbWVyKCk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdtb3VzZWxlYXZlJylcbiAgcHVibGljIG9uTW91c2VMZWF2ZSgpOiB2b2lkIHtcbiAgICB0aGlzLnN0YXJ0VGltZXIodGhpcy5fYXV0b3BsYXkpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignbW91c2V3aGVlbCcsIFsnJGV2ZW50J10pXG4gIHB1YmxpYyBvbk1vdXNlV2hlZWwoZXZlbnQ6IE1vdXNlV2hlZWxFdmVudCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnVzZU1vdXNlV2hlZWwpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7IC8vIHByZXZlbnQgd2luZG93IHRvIHNjcm9sbFxuICAgICAgY29uc3Qgw47ClCA9IE1hdGguc2lnbihldmVudC53aGVlbERlbHRhKTtcblxuICAgICAgaWYgKMOOwpQgPCAwKSB7XG4gICAgICAgIHRoaXMubmV4dCgpO1xuICAgICAgfSBlbHNlIGlmICjDjsKUID4gMCkge1xuICAgICAgICB0aGlzLnByZXZpb3VzKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignd2luZG93OnJlc2l6ZScsIFsnJGV2ZW50J10pXG4gIHB1YmxpYyBvblJlc2l6ZShldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICAvLyBSZXNldCBjYXJvdXNlbCB3aGVuIHdpbmRvdyBpcyByZXNpemVkXG4gICAgLy8gaW4gb3JkZXIgdG8gYXZvaWQgbWFqb3IgZ2xpdGNoZXMuXG4gICAgdGhpcy5zbGlkZVRvKDApO1xuICB9XG5cbiAgcHVibGljIG9uUGFuKGV2ZW50OiBhbnksIHNsaWRlRWxlbTogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2lzc3Vlcy8xMDU0MSNpc3N1ZWNvbW1lbnQtMzQ2NTM5MjQyXG4gICAgLy8gaWYgeSB2ZWxvY2l0eSBpcyBncmVhdGVyLCBpdCdzIGEgcGFudXAvcGFuZG93biwgc28gaWdub3JlLlxuICAgIGlmIChNYXRoLmFicyhldmVudC52ZWxvY2l0eVkpID4gTWF0aC5hYnMoZXZlbnQudmVsb2NpdHlYKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsZXQgw47ClHggPSBldmVudC5kZWx0YVg7XG4gICAgaWYgKHRoaXMuaXNPdXRPZkJvdW5kcygpKSB7XG4gICAgICDDjsKUeCAqPSAwLjI7IC8vIGRlY2VsZXJhdGUgbW92ZW1lbnQ7XG4gICAgfVxuXG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShzbGlkZUVsZW0sICdjdXJzb3InLCAnZ3JhYmJpbmcnKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKFxuICAgICAgdGhpcy5jYXJvdXNlbExpc3QubmF0aXZlRWxlbWVudCxcbiAgICAgICd0cmFuc2Zvcm0nLFxuICAgICAgdGhpcy5nZXRUcmFuc2xhdGlvbih0aGlzLmdldE9mZnNldCgpICsgw47ClHgpXG4gICAgKTtcbiAgfVxuXG4gIHB1YmxpYyBvblBhbkVuZChldmVudDogYW55LCBzbGlkZUVsZW06IEhUTUxFbGVtZW50KTogdm9pZCB7XG4gICAgdGhpcy5yZW5kZXJlci5yZW1vdmVTdHlsZShzbGlkZUVsZW0sICdjdXJzb3InKTtcblxuICAgIGlmIChcbiAgICAgICF0aGlzLmlzT3V0T2ZCb3VuZHMoKSAmJlxuICAgICAgTWF0aC5hYnMoZXZlbnQuZGVsdGFYKSA+IHRoaXMuZ2V0V2lkdGgoKSAqIDAuMjVcbiAgICApIHtcbiAgICAgIGlmIChldmVudC5kZWx0YVggPD0gMCkge1xuICAgICAgICB0aGlzLm5leHQoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGhpcy5wcmV2aW91cygpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnBsYXlBbmltYXRpb24oKTsgLy8gc2xpZGUgYmFjaywgZG9uJ3QgY2hhbmdlIGN1cnJlbnQgaW5kZXhcbiAgfVxuXG4gIHByaXZhdGUgaXNPdXRPZkJvdW5kcygpOiBib29sZWFuIHtcbiAgICBjb25zdCBzaWduID0gdGhpcy5vcmllbnRhdGlvbiA9PT0gJ3J0bCcgPyAtMSA6IDE7XG4gICAgY29uc3QgbGVmdCA9XG4gICAgICBzaWduICpcbiAgICAgICh0aGlzLmNhcm91c2VsTGlzdC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQgLVxuICAgICAgICB0aGlzLmNhcm91c2VsTGlzdC5uYXRpdmVFbGVtZW50Lm9mZnNldFBhcmVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgICAgICAgIC5sZWZ0KTtcbiAgICBjb25zdCBsYXN0SW5kZXggPSB0aGlzLnNsaWRlc0xpc3QubGVuZ3RoIC0gMTtcbiAgICBjb25zdCB3aWR0aCA9IC10aGlzLmdldFdpZHRoKCkgKiBsYXN0SW5kZXg7XG5cbiAgICByZXR1cm4gKFxuICAgICAgKHRoaXMubGlzdEtleU1hbmFnZXIuYWN0aXZlSXRlbUluZGV4ID09PSAwICYmIGxlZnQgPj0gMCkgfHxcbiAgICAgICh0aGlzLmxpc3RLZXlNYW5hZ2VyLmFjdGl2ZUl0ZW1JbmRleCA9PT0gbGFzdEluZGV4ICYmIGxlZnQgPD0gd2lkdGgpXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgaXNWaXNpYmxlKCk6IGJvb2xlYW4ge1xuICAgIGlmICghaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IGVsZW0gPSB0aGlzLmNhcm91c2VsQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQ7XG4gICAgY29uc3QgZG9jVmlld1RvcCA9IHdpbmRvdy5wYWdlWU9mZnNldDtcbiAgICBjb25zdCBkb2NWaWV3Qm90dG9tID0gZG9jVmlld1RvcCArIHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICBjb25zdCBlbGVtT2Zmc2V0ID0gZWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBjb25zdCBlbGVtVG9wID0gZG9jVmlld1RvcCArIGVsZW1PZmZzZXQudG9wO1xuICAgIGNvbnN0IGVsZW1Cb3R0b20gPSBlbGVtVG9wICsgZWxlbU9mZnNldC5oZWlnaHQ7XG5cbiAgICByZXR1cm4gZWxlbUJvdHRvbSA8PSBkb2NWaWV3Qm90dG9tIHx8IGVsZW1Ub3AgPj0gZG9jVmlld1RvcDtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0T2Zmc2V0KCk6IG51bWJlciB7XG4gICAgY29uc3Qgb2Zmc2V0ID0gdGhpcy5saXN0S2V5TWFuYWdlci5hY3RpdmVJdGVtSW5kZXggKiB0aGlzLmdldFdpZHRoKCk7XG4gICAgY29uc3Qgc2lnbiA9IHRoaXMub3JpZW50YXRpb24gPT09ICdydGwnID8gMSA6IC0xO1xuICAgIHJldHVybiBzaWduICogb2Zmc2V0O1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRUcmFuc2xhdGlvbihvZmZzZXQ6IG51bWJlcik6IHN0cmluZyB7XG4gICAgcmV0dXJuIGB0cmFuc2xhdGVYKCR7b2Zmc2V0fXB4KWA7XG4gIH1cblxuICBwcml2YXRlIGdldFdpZHRoKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuY2Fyb3VzZWxDb250YWluZXIubmF0aXZlRWxlbWVudC5jbGllbnRXaWR0aDtcbiAgfVxuXG4gIHByaXZhdGUgZ290byhkaXJlY3Rpb246IERpcmVjdGlvbiwgaW5kZXg/OiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMucGxheWluZykge1xuICAgICAgY29uc3QgcnRsID0gdGhpcy5vcmllbnRhdGlvbiA9PT0gJ3J0bCc7XG5cbiAgICAgIHN3aXRjaCAoZGlyZWN0aW9uKSB7XG4gICAgICAgIGNhc2UgRGlyZWN0aW9uLkxlZnQ6XG4gICAgICAgICAgcmV0dXJuIHJ0bFxuICAgICAgICAgICAgPyB0aGlzLmxpc3RLZXlNYW5hZ2VyLnNldE5leHRJdGVtQWN0aXZlKClcbiAgICAgICAgICAgIDogdGhpcy5saXN0S2V5TWFuYWdlci5zZXRQcmV2aW91c0l0ZW1BY3RpdmUoKTtcbiAgICAgICAgY2FzZSBEaXJlY3Rpb24uUmlnaHQ6XG4gICAgICAgICAgcmV0dXJuIHJ0bFxuICAgICAgICAgICAgPyB0aGlzLmxpc3RLZXlNYW5hZ2VyLnNldFByZXZpb3VzSXRlbUFjdGl2ZSgpXG4gICAgICAgICAgICA6IHRoaXMubGlzdEtleU1hbmFnZXIuc2V0TmV4dEl0ZW1BY3RpdmUoKTtcbiAgICAgICAgY2FzZSBEaXJlY3Rpb24uSW5kZXg6XG4gICAgICAgICAgcmV0dXJuIHRoaXMubGlzdEtleU1hbmFnZXIuc2V0QWN0aXZlSXRlbShpbmRleCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBwbGF5QW5pbWF0aW9uKCk6IHZvaWQge1xuICAgIGNvbnN0IHRyYW5zbGF0aW9uID0gdGhpcy5nZXRUcmFuc2xhdGlvbih0aGlzLmdldE9mZnNldCgpKTtcbiAgICBjb25zdCBmYWN0b3J5ID0gdGhpcy5hbmltYXRpb25CdWlsZGVyLmJ1aWxkKFxuICAgICAgYW5pbWF0ZSh0aGlzLnRpbWluZ3MsIHN0eWxlKHsgdHJhbnNmb3JtOiB0cmFuc2xhdGlvbiB9KSlcbiAgICApO1xuICAgIGNvbnN0IGFuaW1hdGlvbiA9IGZhY3RvcnkuY3JlYXRlKHRoaXMuY2Fyb3VzZWxMaXN0Lm5hdGl2ZUVsZW1lbnQpO1xuXG4gICAgYW5pbWF0aW9uLm9uU3RhcnQoKCkgPT4gKHRoaXMucGxheWluZyA9IHRydWUpKTtcbiAgICBhbmltYXRpb24ub25Eb25lKCgpID0+IHtcbiAgICAgIHRoaXMuY2hhbmdlLmVtaXQodGhpcy5jdXJyZW50SW5kZXgpO1xuICAgICAgdGhpcy5wbGF5aW5nID0gZmFsc2U7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKFxuICAgICAgICB0aGlzLmNhcm91c2VsTGlzdC5uYXRpdmVFbGVtZW50LFxuICAgICAgICAndHJhbnNmb3JtJyxcbiAgICAgICAgdHJhbnNsYXRpb25cbiAgICAgICk7XG4gICAgICBhbmltYXRpb24uZGVzdHJveSgpO1xuICAgIH0pO1xuICAgIGFuaW1hdGlvbi5wbGF5KCk7XG4gIH1cblxuICBwcml2YXRlIHJlc2V0U2xpZGVzKHNsaWRlczogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5zbGlkZXNMaXN0LnJlc2V0KHRoaXMuc2xpZGVzTGlzdC50b0FycmF5KCkuc2xpY2UoMCwgc2xpZGVzKSk7XG4gIH1cblxuICBwcml2YXRlIHJlc2V0VGltZXIodmFsdWU6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMudGltZXIkID0gaW50ZXJ2YWwodmFsdWUpO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGFydFRpbWVyKGF1dG9wbGF5OiBib29sZWFuKTogdm9pZCB7XG4gICAgaWYgKCFhdXRvcGxheSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMudGltZXIkXG4gICAgICAucGlwZShcbiAgICAgICAgdGFrZVVudGlsKHRoaXMudGltZXJTdG9wJCksXG4gICAgICAgIHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSxcbiAgICAgICAgZmlsdGVyKCgpID0+IHRoaXMuaXNWaXNpYmxlKCkpXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5saXN0S2V5TWFuYWdlci53aXRoV3JhcCh0cnVlKS5zZXROZXh0SXRlbUFjdGl2ZSgpO1xuICAgICAgICB0aGlzLmxpc3RLZXlNYW5hZ2VyLndpdGhXcmFwKHRoaXMubG9vcCk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgc3RvcFRpbWVyKCk6IHZvaWQge1xuICAgIHRoaXMudGltZXJTdG9wJC5uZXh0KCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTWF0QnV0dG9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvYnV0dG9uJztcbmltcG9ydCB7IE1hdEljb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9pY29uJztcblxuaW1wb3J0IHsgTWF0Q2Fyb3VzZWxDb21wb25lbnQgfSBmcm9tICcuL2Nhcm91c2VsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXRDYXJvdXNlbFNsaWRlQ29tcG9uZW50IH0gZnJvbSAnLi9jYXJvdXNlbC1zbGlkZS9jYXJvdXNlbC1zbGlkZS5jb21wb25lbnQnO1xuaW1wb3J0IHtcbiAgSGFtbWVyR2VzdHVyZUNvbmZpZyxcbiAgSEFNTUVSX0dFU1RVUkVfQ09ORklHXG59IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHsgTW9kdWxlV2l0aFByb3ZpZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvbXBpbGVyL3NyYy9jb3JlJztcblxuLy8gaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvMTA1NDEjaXNzdWVjb21tZW50LTMwMDc2MTM4N1xuZXhwb3J0IGNsYXNzIE1hdENhcm91c2VsSGFtbWVyQ29uZmlnIGV4dGVuZHMgSGFtbWVyR2VzdHVyZUNvbmZpZyB7XG4gIG92ZXJyaWRlcyA9IHtcbiAgICBwaW5jaDogeyBlbmFibGU6IGZhbHNlIH0sXG4gICAgcm90YXRlOiB7IGVuYWJsZTogZmFsc2UgfVxuICB9O1xufVxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbTWF0Q2Fyb3VzZWxDb21wb25lbnQsIE1hdENhcm91c2VsU2xpZGVDb21wb25lbnRdLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBNYXRCdXR0b25Nb2R1bGUsIE1hdEljb25Nb2R1bGVdLFxuICBleHBvcnRzOiBbTWF0Q2Fyb3VzZWxDb21wb25lbnQsIE1hdENhcm91c2VsU2xpZGVDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIE1hdENhcm91c2VsTW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBNYXRDYXJvdXNlbE1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7IHByb3ZpZGU6IEhBTU1FUl9HRVNUVVJFX0NPTkZJRywgdXNlQ2xhc3M6IE1hdENhcm91c2VsSGFtbWVyQ29uZmln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
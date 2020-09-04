import { Component, Input, TemplateRef, ViewChild, ContentChildren, EventEmitter, HostListener, Inject, Output, PLATFORM_ID, Renderer2, NgModule } from '@angular/core';
import { DomSanitizer, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { animate, style, AnimationBuilder } from '@angular/animations';
import { ListKeyManager } from '@angular/cdk/a11y';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { interval, BehaviorSubject, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { __extends } from 'tslib';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {number} */
var Direction = {
    Left: 0,
    Right: 1,
    Index: 2,
};
Direction[Direction.Left] = 'Left';
Direction[Direction.Right] = 'Right';
Direction[Direction.Index] = 'Index';
var MatCarouselComponent = /** @class */ (function () {
    function MatCarouselComponent(animationBuilder, renderer, platformId) {
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
    Object.defineProperty(MatCarouselComponent.prototype, "autoplay", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.autoplay$.next(value);
            this._autoplay = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatCarouselComponent.prototype, "interval", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.interval$.next(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatCarouselComponent.prototype, "loop", {
        get: /**
         * @return {?}
         */
        function () {
            return this._loop;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.loop$.next(value);
            this._loop = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatCarouselComponent.prototype, "maxWidth", {
        get: /**
         * @return {?}
         */
        function () {
            return this._maxWidth;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._maxWidth = value;
            this.maxWidth$.next();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatCarouselComponent.prototype, "slides", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.slides$.next(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatCarouselComponent.prototype, "orientation", {
        get: /**
         * @return {?}
         */
        function () {
            return this._orientation;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.orientation$.next(value);
            this._orientation = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatCarouselComponent.prototype, "currentIndex", {
        get: /**
         * @return {?}
         */
        function () {
            if (this.listKeyManager) {
                return this.listKeyManager.activeItemIndex;
            }
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatCarouselComponent.prototype, "currentSlide", {
        get: /**
         * @return {?}
         */
        function () {
            if (this.listKeyManager) {
                return this.listKeyManager.activeItem;
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    MatCarouselComponent.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.listKeyManager = new ListKeyManager(this.slidesList)
            .withVerticalOrientation(false)
            .withHorizontalOrientation(this._orientation)
            .withWrap(this._loop);
        this.listKeyManager.updateActiveItem(0);
        this.listKeyManager.change
            .pipe(takeUntil(this.destroy$))
            .subscribe(function () { return _this.playAnimation(); });
    };
    /**
     * @return {?}
     */
    MatCarouselComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.autoplay$.pipe(takeUntil(this.destroy$)).subscribe(function (value) {
            _this.stopTimer();
            _this.startTimer(value);
        });
        this.interval$.pipe(takeUntil(this.destroy$)).subscribe(function (value) {
            _this.stopTimer();
            _this.resetTimer(value);
            _this.startTimer(_this._autoplay);
        });
        this.maxWidth$
            .pipe(takeUntil(this.destroy$))
            .subscribe(function () { return _this.slideTo(0); });
        this.loop$
            .pipe(takeUntil(this.destroy$))
            .subscribe(function (value) { return _this.listKeyManager.withWrap(value); });
        this.orientation$
            .pipe(takeUntil(this.destroy$))
            .subscribe(function (value) { return _this.listKeyManager.withHorizontalOrientation(value); });
        this.slides$
            .pipe(takeUntil(this.destroy$), filter(function (value) { return value && value < _this.slidesList.length; }))
            .subscribe(function (value) { return _this.resetSlides(value); });
    };
    /**
     * @return {?}
     */
    MatCarouselComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.destroy$.next();
        this.destroy$.complete();
    };
    /**
     * @return {?}
     */
    MatCarouselComponent.prototype.next = /**
     * @return {?}
     */
    function () {
        this.goto(Direction.Right);
    };
    /**
     * @return {?}
     */
    MatCarouselComponent.prototype.previous = /**
     * @return {?}
     */
    function () {
        this.goto(Direction.Left);
    };
    /**
     * @param {?} index
     * @return {?}
     */
    MatCarouselComponent.prototype.slideTo = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        this.goto(Direction.Index, index);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    MatCarouselComponent.prototype.onKeyUp = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.useKeyboard && !this.playing) {
            this.listKeyManager.onKeydown(event);
        }
    };
    /**
     * @return {?}
     */
    MatCarouselComponent.prototype.onMouseEnter = /**
     * @return {?}
     */
    function () {
        this.stopTimer();
    };
    /**
     * @return {?}
     */
    MatCarouselComponent.prototype.onMouseLeave = /**
     * @return {?}
     */
    function () {
        this.startTimer(this._autoplay);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    MatCarouselComponent.prototype.onMouseWheel = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.useMouseWheel) {
            event.preventDefault(); // prevent window to scroll
            // prevent window to scroll
            /** @type {?} */
            var Δ = Math.sign(event.wheelDelta);
            if (Δ < 0) {
                this.next();
            }
            else if (Δ > 0) {
                this.previous();
            }
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    MatCarouselComponent.prototype.onResize = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        // Reset carousel when window is resized
        // in order to avoid major glitches.
        this.slideTo(0);
    };
    /**
     * @param {?} event
     * @param {?} slideElem
     * @return {?}
     */
    MatCarouselComponent.prototype.onPan = /**
     * @param {?} event
     * @param {?} slideElem
     * @return {?}
     */
    function (event, slideElem) {
        // https://github.com/angular/angular/issues/10541#issuecomment-346539242
        // if y velocity is greater, it's a panup/pandown, so ignore.
        if (Math.abs(event.velocityY) > Math.abs(event.velocityX)) {
            return;
        }
        /** @type {?} */
        var Δx = event.deltaX;
        if (this.isOutOfBounds()) {
            Δx *= 0.2; // decelerate movement;
        }
        this.renderer.setStyle(slideElem, 'cursor', 'grabbing');
        this.renderer.setStyle(this.carouselList.nativeElement, 'transform', this.getTranslation(this.getOffset() + Δx));
    };
    /**
     * @param {?} event
     * @param {?} slideElem
     * @return {?}
     */
    MatCarouselComponent.prototype.onPanEnd = /**
     * @param {?} event
     * @param {?} slideElem
     * @return {?}
     */
    function (event, slideElem) {
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
    };
    /**
     * @private
     * @return {?}
     */
    MatCarouselComponent.prototype.isOutOfBounds = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var sign = this.orientation === 'rtl' ? -1 : 1;
        /** @type {?} */
        var left = sign *
            (this.carouselList.nativeElement.getBoundingClientRect().left -
                this.carouselList.nativeElement.offsetParent.getBoundingClientRect()
                    .left);
        /** @type {?} */
        var lastIndex = this.slidesList.length - 1;
        /** @type {?} */
        var width = -this.getWidth() * lastIndex;
        return ((this.listKeyManager.activeItemIndex === 0 && left >= 0) ||
            (this.listKeyManager.activeItemIndex === lastIndex && left <= width));
    };
    /**
     * @private
     * @return {?}
     */
    MatCarouselComponent.prototype.isVisible = /**
     * @private
     * @return {?}
     */
    function () {
        if (!isPlatformBrowser(this.platformId)) {
            return false;
        }
        /** @type {?} */
        var elem = this.carouselContainer.nativeElement;
        /** @type {?} */
        var docViewTop = window.pageYOffset;
        /** @type {?} */
        var docViewBottom = docViewTop + window.innerHeight;
        /** @type {?} */
        var elemOffset = elem.getBoundingClientRect();
        /** @type {?} */
        var elemTop = docViewTop + elemOffset.top;
        /** @type {?} */
        var elemBottom = elemTop + elemOffset.height;
        return elemBottom <= docViewBottom || elemTop >= docViewTop;
    };
    /**
     * @private
     * @return {?}
     */
    MatCarouselComponent.prototype.getOffset = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var offset = this.listKeyManager.activeItemIndex * this.getWidth();
        /** @type {?} */
        var sign = this.orientation === 'rtl' ? 1 : -1;
        return sign * offset;
    };
    /**
     * @private
     * @param {?} offset
     * @return {?}
     */
    MatCarouselComponent.prototype.getTranslation = /**
     * @private
     * @param {?} offset
     * @return {?}
     */
    function (offset) {
        return "translateX(" + offset + "px)";
    };
    /**
     * @private
     * @return {?}
     */
    MatCarouselComponent.prototype.getWidth = /**
     * @private
     * @return {?}
     */
    function () {
        return this.carouselContainer.nativeElement.clientWidth;
    };
    /**
     * @private
     * @param {?} direction
     * @param {?=} index
     * @return {?}
     */
    MatCarouselComponent.prototype.goto = /**
     * @private
     * @param {?} direction
     * @param {?=} index
     * @return {?}
     */
    function (direction, index) {
        if (!this.playing) {
            /** @type {?} */
            var rtl = this.orientation === 'rtl';
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
    };
    /**
     * @private
     * @return {?}
     */
    MatCarouselComponent.prototype.playAnimation = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var translation = this.getTranslation(this.getOffset());
        /** @type {?} */
        var factory = this.animationBuilder.build(animate(this.timings, style({ transform: translation })));
        /** @type {?} */
        var animation = factory.create(this.carouselList.nativeElement);
        animation.onStart(function () { return (_this.playing = true); });
        animation.onDone(function () {
            _this.change.emit(_this.currentIndex);
            _this.playing = false;
            _this.renderer.setStyle(_this.carouselList.nativeElement, 'transform', translation);
            animation.destroy();
        });
        animation.play();
    };
    /**
     * @private
     * @param {?} slides
     * @return {?}
     */
    MatCarouselComponent.prototype.resetSlides = /**
     * @private
     * @param {?} slides
     * @return {?}
     */
    function (slides) {
        this.slidesList.reset(this.slidesList.toArray().slice(0, slides));
    };
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    MatCarouselComponent.prototype.resetTimer = /**
     * @private
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.timer$ = interval(value);
    };
    /**
     * @private
     * @param {?} autoplay
     * @return {?}
     */
    MatCarouselComponent.prototype.startTimer = /**
     * @private
     * @param {?} autoplay
     * @return {?}
     */
    function (autoplay) {
        var _this = this;
        if (!autoplay) {
            return;
        }
        this.timer$
            .pipe(takeUntil(this.timerStop$), takeUntil(this.destroy$), filter(function () { return _this.isVisible(); }))
            .subscribe(function () {
            _this.listKeyManager.withWrap(true).setNextItemActive();
            _this.listKeyManager.withWrap(_this.loop);
        });
    };
    /**
     * @private
     * @return {?}
     */
    MatCarouselComponent.prototype.stopTimer = /**
     * @private
     * @return {?}
     */
    function () {
        this.timerStop$.next();
    };
    MatCarouselComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mat-carousel',
                    template: "<div\n  #carouselContainer\n  class=\"carousel\"\n  tabindex=\"0\"\n  [style.max-width]=\"maxWidth\"\n  [style.height]=\"!maintainAspectRatio ? '100%' : 'auto'\"\n>\n  <ul\n    #carouselList\n    class=\"carousel-list\"\n    role=\"listbox\"\n    [style.flex-direction]=\"orientation === 'rtl' ? 'row-reverse' : 'row'\"\n    [style.height]=\"!maintainAspectRatio ? '100%' : 'auto'\"\n  >\n    <li\n      #carouselSlide\n      *ngFor=\"let slide of slidesList\"\n      class=\"carousel-slide\"\n      role=\"option\"\n      [style.padding-bottom]=\"maintainAspectRatio && proportion ? proportion + '%': '0px'\"\n      [style.height]=\"!maintainAspectRatio && slideHeight ? slideHeight : '0px'\"\n      (panleft)=\"onPan($event, carouselSlide)\"\n      (panright)=\"onPan($event, carouselSlide)\"\n      (panend)=\"onPanEnd($event, carouselSlide)\"\n      (pancancel)=\"onPanEnd($event, carouselSlide)\"\n    >\n      <ng-container [ngTemplateOutlet]=\"slide.templateRef\"></ng-container>\n    </li>\n  </ul>\n\n  <button\n    *ngIf=\"!hideArrows\"\n    mat-icon-button\n    type=\"button\"\n    tabindex=\"-1\"\n    [color]=\"color\"\n    [disabled]=\"!loop && currentIndex == 0\"\n    (click)=\"previous()\"\n  >\n    <mat-icon\n      *ngIf=\"svgIconOverrides?.arrowBack; else: defaultArrowBack\"\n      [svgIcon]=\"svgIconOverrides.arrowBack\"\n    ></mat-icon>\n    <ng-template #defaultArrowBack>\n      <mat-icon>arrow_back</mat-icon>\n    </ng-template>\n  </button>\n  <button\n    *ngIf=\"!hideArrows\"\n    mat-icon-button\n    type=\"button\"\n    tabindex=\"-1\"\n    [color]=\"color\"\n    [disabled]=\"!loop && currentIndex == slidesList.length - 1\"\n    (click)=\"next()\"\n  >\n    <mat-icon\n      *ngIf=\"svgIconOverrides?.arrowForward; else: defaultArrowForward\"\n      [svgIcon]=\"svgIconOverrides.arrowForward\"\n    ></mat-icon>\n    <ng-template #defaultArrowForward>\n      <mat-icon>arrow_forward</mat-icon>\n    </ng-template>\n  </button>\n\n  <div\n    *ngIf=\"!hideIndicators\"\n    class=\"carousel-indicators\"\n    tabindex=\"-1\"\n    [style.flex-direction]=\"orientation === 'rtl' ? 'row-reverse' : 'row'\"\n  >\n    <button\n      *ngFor=\"let slide of slidesList; let i = index\"\n      type=\"button\"\n      tabindex=\"-1\"\n      mat-mini-fab\n      [color]=\"color\"\n      [disabled]=\"i == currentIndex\"\n      (click)=\"slideTo(i)\"\n      (focus)=\"carouselContainer.focus()\"\n    ></button>\n  </div>\n</div>\n",
                    styles: [".carousel{width:100%;position:relative;overflow:hidden;outline:0}.carousel>button{position:absolute;z-index:1;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%)}.carousel>button:first-of-type{left:30px}.carousel>button:last-of-type{right:30px}.carousel-list{width:100%;margin:0;padding:0;list-style:none;display:flex;position:relative}.carousel-slide{width:100%;height:0;display:flex;flex-shrink:0;position:relative}.carousel-slide:hover{cursor:-webkit-grab;cursor:grab}.carousel-indicators{display:flex;position:absolute;bottom:15px;z-index:1;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%);outline:0}.carousel-indicators>button{width:10px;height:10px;margin:7.5px}"]
                }] }
    ];
    /** @nocollapse */
    MatCarouselComponent.ctorParameters = function () { return [
        { type: AnimationBuilder },
        { type: Renderer2 },
        { type: undefined, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
    ]; };
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
    return MatCarouselComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// https://github.com/angular/angular/issues/10541#issuecomment-300761387
var  
// https://github.com/angular/angular/issues/10541#issuecomment-300761387
MatCarouselHammerConfig = /** @class */ (function (_super) {
    __extends(MatCarouselHammerConfig, _super);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdtb2R1bGUtbWF0ZXJpYWwtY2Fyb3VzZWwuanMubWFwIiwic291cmNlcyI6WyJuZzovL0BuZ21vZHVsZS9tYXRlcmlhbC1jYXJvdXNlbC9saWIvY2Fyb3VzZWwtc2xpZGUvY2Fyb3VzZWwtc2xpZGUuY29tcG9uZW50LnRzIiwibmc6Ly9Abmdtb2R1bGUvbWF0ZXJpYWwtY2Fyb3VzZWwvbGliL2Nhcm91c2VsLmNvbXBvbmVudC50cyIsIm5nOi8vQG5nbW9kdWxlL21hdGVyaWFsLWNhcm91c2VsL2xpYi9jYXJvdXNlbC5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTGlzdEtleU1hbmFnZXJPcHRpb24gfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPbkluaXQsXG4gIFRlbXBsYXRlUmVmLFxuICBWaWV3Q2hpbGRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEb21TYW5pdGl6ZXIsIFNhZmVTdHlsZSB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG5pbXBvcnQgeyBNYXRDYXJvdXNlbFNsaWRlIH0gZnJvbSAnLi9jYXJvdXNlbC1zbGlkZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21hdC1jYXJvdXNlbC1zbGlkZScsXG4gIHRlbXBsYXRlVXJsOiAnLi9jYXJvdXNlbC1zbGlkZS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2Nhcm91c2VsLXNsaWRlLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgTWF0Q2Fyb3VzZWxTbGlkZUNvbXBvbmVudFxuICBpbXBsZW1lbnRzIExpc3RLZXlNYW5hZ2VyT3B0aW9uLCBNYXRDYXJvdXNlbFNsaWRlLCBPbkluaXQge1xuICBASW5wdXQoKSBwdWJsaWMgaW1hZ2U6IFNhZmVTdHlsZTtcbiAgQElucHV0KCkgcHVibGljIG92ZXJsYXlDb2xvciA9ICcjMDAwMDAwNDAnO1xuICBASW5wdXQoKSBwdWJsaWMgaGlkZU92ZXJsYXkgPSBmYWxzZTtcbiAgQElucHV0KCkgcHVibGljIGRpc2FibGVkID0gZmFsc2U7IC8vIGltcGxlbWVudHMgTGlzdEtleU1hbmFnZXJPcHRpb25cblxuICBAVmlld0NoaWxkKFRlbXBsYXRlUmVmKSBwdWJsaWMgdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPGFueT47XG4gICAgXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBzYW5pdGl6ZXI6IERvbVNhbml0aXplcikge1xuICB9XG5cbiAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmltYWdlKSB7XG4gICAgICB0aGlzLmltYWdlID0gdGhpcy5zYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdFN0eWxlKGB1cmwoXCIke3RoaXMuaW1hZ2V9XCIpYCk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBhbmltYXRlLCBzdHlsZSwgQW5pbWF0aW9uQnVpbGRlciB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgTGlzdEtleU1hbmFnZXIgfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICBBZnRlckNvbnRlbnRJbml0LFxuICBBZnRlclZpZXdJbml0LFxuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0TGlzdGVuZXIsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT3V0cHV0LFxuICBQTEFURk9STV9JRCxcbiAgUXVlcnlMaXN0LFxuICBSZW5kZXJlcjIsXG4gIFZpZXdDaGlsZFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRoZW1lUGFsZXR0ZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuaW1wb3J0IHsgaW50ZXJ2YWwsIEJlaGF2aW9yU3ViamVjdCwgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IE1hdENhcm91c2VsLCBPcmllbnRhdGlvbiwgU3ZnSWNvbk92ZXJyaWRlcyB9IGZyb20gJy4vY2Fyb3VzZWwnO1xuaW1wb3J0IHsgTWF0Q2Fyb3VzZWxTbGlkZUNvbXBvbmVudCB9IGZyb20gJy4vY2Fyb3VzZWwtc2xpZGUvY2Fyb3VzZWwtc2xpZGUuY29tcG9uZW50JztcblxuZW51bSBEaXJlY3Rpb24ge1xuICBMZWZ0LFxuICBSaWdodCxcbiAgSW5kZXhcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWF0LWNhcm91c2VsJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2Nhcm91c2VsLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vY2Fyb3VzZWwuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBNYXRDYXJvdXNlbENvbXBvbmVudFxuICBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIEFmdGVyVmlld0luaXQsIE1hdENhcm91c2VsLCBPbkRlc3Ryb3kge1xuICBASW5wdXQoKSBwdWJsaWMgdGltaW5ncyA9ICcyNTBtcyBlYXNlLWluJztcbiAgQElucHV0KCkgcHVibGljIHN2Z0ljb25PdmVycmlkZXM6IFN2Z0ljb25PdmVycmlkZXM7XG5cbiAgQElucHV0KClcbiAgcHVibGljIHNldCBhdXRvcGxheSh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuYXV0b3BsYXkkLm5leHQodmFsdWUpO1xuICAgIHRoaXMuX2F1dG9wbGF5ID0gdmFsdWU7XG4gIH1cblxuICBASW5wdXQoKVxuICBwdWJsaWMgc2V0IGludGVydmFsKHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLmludGVydmFsJC5uZXh0KHZhbHVlKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgbG9vcCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fbG9vcDtcbiAgfVxuICBASW5wdXQoKVxuICBwdWJsaWMgc2V0IGxvb3AodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLmxvb3AkLm5leHQodmFsdWUpO1xuICAgIHRoaXMuX2xvb3AgPSB2YWx1ZTtcbiAgfVxuXG4gIEBJbnB1dCgpIHB1YmxpYyBoaWRlQXJyb3dzID0gdHJ1ZTtcbiAgQElucHV0KCkgcHVibGljIGhpZGVJbmRpY2F0b3JzID0gdHJ1ZTtcbiAgQElucHV0KCkgcHVibGljIGNvbG9yOiBUaGVtZVBhbGV0dGUgPSAnYWNjZW50JztcblxuICBwdWJsaWMgZ2V0IG1heFdpZHRoKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX21heFdpZHRoO1xuICB9XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBzZXQgbWF4V2lkdGgodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuX21heFdpZHRoID0gdmFsdWU7XG4gICAgdGhpcy5tYXhXaWR0aCQubmV4dCgpO1xuICB9XG5cbiAgQElucHV0KCkgcHVibGljIG1haW50YWluQXNwZWN0UmF0aW8gPSB0cnVlO1xuICBASW5wdXQoKSBwdWJsaWMgcHJvcG9ydGlvbiA9IDI1O1xuICBASW5wdXQoKSBwdWJsaWMgc2xpZGVIZWlnaHQgPSAnMTAwJSc7XG5cbiAgQElucHV0KClcbiAgcHVibGljIHNldCBzbGlkZXModmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMuc2xpZGVzJC5uZXh0KHZhbHVlKTtcbiAgfVxuXG4gIEBJbnB1dCgpIHB1YmxpYyB1c2VLZXlib2FyZCA9IGZhbHNlO1xuICBASW5wdXQoKSBwdWJsaWMgdXNlTW91c2VXaGVlbCA9IGZhbHNlO1xuXG4gIHB1YmxpYyBnZXQgb3JpZW50YXRpb24oKTogT3JpZW50YXRpb24ge1xuICAgIHJldHVybiB0aGlzLl9vcmllbnRhdGlvbjtcbiAgfVxuICBASW5wdXQoKVxuICBwdWJsaWMgc2V0IG9yaWVudGF0aW9uKHZhbHVlOiBPcmllbnRhdGlvbikge1xuICAgIHRoaXMub3JpZW50YXRpb24kLm5leHQodmFsdWUpO1xuICAgIHRoaXMuX29yaWVudGF0aW9uID0gdmFsdWU7XG4gIH1cblxuICBAT3V0cHV0KClcbiAgcHVibGljIGNoYW5nZTogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcblxuICBwdWJsaWMgZ2V0IGN1cnJlbnRJbmRleCgpOiBudW1iZXIge1xuICAgIGlmICh0aGlzLmxpc3RLZXlNYW5hZ2VyKSB7XG4gICAgICByZXR1cm4gdGhpcy5saXN0S2V5TWFuYWdlci5hY3RpdmVJdGVtSW5kZXg7XG4gICAgfVxuXG4gICAgcmV0dXJuIDA7XG4gIH1cbiAgcHVibGljIGdldCBjdXJyZW50U2xpZGUoKTogTWF0Q2Fyb3VzZWxTbGlkZUNvbXBvbmVudCB7XG4gICAgaWYgKHRoaXMubGlzdEtleU1hbmFnZXIpIHtcbiAgICAgIHJldHVybiB0aGlzLmxpc3RLZXlNYW5hZ2VyLmFjdGl2ZUl0ZW07XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBAQ29udGVudENoaWxkcmVuKE1hdENhcm91c2VsU2xpZGVDb21wb25lbnQpIHB1YmxpYyBzbGlkZXNMaXN0OiBRdWVyeUxpc3Q8XG4gICAgTWF0Q2Fyb3VzZWxTbGlkZUNvbXBvbmVudFxuICA+O1xuICBAVmlld0NoaWxkKCdjYXJvdXNlbENvbnRhaW5lcicpIHByaXZhdGUgY2Fyb3VzZWxDb250YWluZXI6IEVsZW1lbnRSZWY8XG4gICAgSFRNTERpdkVsZW1lbnRcbiAgPjtcbiAgQFZpZXdDaGlsZCgnY2Fyb3VzZWxMaXN0JykgcHJpdmF0ZSBjYXJvdXNlbExpc3Q6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+O1xuICBwdWJsaWMgbGlzdEtleU1hbmFnZXI6IExpc3RLZXlNYW5hZ2VyPE1hdENhcm91c2VsU2xpZGVDb21wb25lbnQ+O1xuXG4gIHByaXZhdGUgX2F1dG9wbGF5ID0gdHJ1ZTtcbiAgcHJpdmF0ZSBhdXRvcGxheSQgPSBuZXcgU3ViamVjdDxib29sZWFuPigpO1xuXG4gIHByaXZhdGUgaW50ZXJ2YWwkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDUwMDApO1xuICBwcml2YXRlIHNsaWRlcyQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4obnVsbCk7XG5cbiAgcHJpdmF0ZSBfbWF4V2lkdGggPSAnYXV0byc7XG4gIHByaXZhdGUgbWF4V2lkdGgkID0gbmV3IFN1YmplY3Q8bmV2ZXI+KCk7XG5cbiAgcHJpdmF0ZSBfbG9vcCA9IHRydWU7XG4gIHByaXZhdGUgbG9vcCQgPSBuZXcgU3ViamVjdDxib29sZWFuPigpO1xuXG4gIHByaXZhdGUgX29yaWVudGF0aW9uOiBPcmllbnRhdGlvbiA9ICdsdHInO1xuICBwcml2YXRlIG9yaWVudGF0aW9uJCA9IG5ldyBTdWJqZWN0PE9yaWVudGF0aW9uPigpO1xuXG4gIHByaXZhdGUgdGltZXIkOiBPYnNlcnZhYmxlPG51bWJlcj47XG4gIHByaXZhdGUgdGltZXJTdG9wJCA9IG5ldyBTdWJqZWN0PG5ldmVyPigpO1xuXG4gIHByaXZhdGUgZGVzdHJveSQgPSBuZXcgU3ViamVjdDxuZXZlcj4oKTtcbiAgcHJpdmF0ZSBwbGF5aW5nID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBhbmltYXRpb25CdWlsZGVyOiBBbmltYXRpb25CdWlsZGVyLFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWRcbiAgKSB7fVxuXG4gIHB1YmxpYyBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5saXN0S2V5TWFuYWdlciA9IG5ldyBMaXN0S2V5TWFuYWdlcih0aGlzLnNsaWRlc0xpc3QpXG4gICAgICAud2l0aFZlcnRpY2FsT3JpZW50YXRpb24oZmFsc2UpXG4gICAgICAud2l0aEhvcml6b250YWxPcmllbnRhdGlvbih0aGlzLl9vcmllbnRhdGlvbilcbiAgICAgIC53aXRoV3JhcCh0aGlzLl9sb29wKTtcblxuICAgIHRoaXMubGlzdEtleU1hbmFnZXIudXBkYXRlQWN0aXZlSXRlbSgwKTtcbiAgICB0aGlzLmxpc3RLZXlNYW5hZ2VyLmNoYW5nZVxuICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLnBsYXlBbmltYXRpb24oKSk7XG4gIH1cblxuICBwdWJsaWMgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHRoaXMuYXV0b3BsYXkkLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKS5zdWJzY3JpYmUodmFsdWUgPT4ge1xuICAgICAgdGhpcy5zdG9wVGltZXIoKTtcbiAgICAgIHRoaXMuc3RhcnRUaW1lcih2YWx1ZSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmludGVydmFsJC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSkuc3Vic2NyaWJlKHZhbHVlID0+IHtcbiAgICAgIHRoaXMuc3RvcFRpbWVyKCk7XG4gICAgICB0aGlzLnJlc2V0VGltZXIodmFsdWUpO1xuICAgICAgdGhpcy5zdGFydFRpbWVyKHRoaXMuX2F1dG9wbGF5KTtcbiAgICB9KTtcblxuICAgIHRoaXMubWF4V2lkdGgkXG4gICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuc2xpZGVUbygwKSk7XG5cbiAgICB0aGlzLmxvb3AkXG4gICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpXG4gICAgICAuc3Vic2NyaWJlKHZhbHVlID0+IHRoaXMubGlzdEtleU1hbmFnZXIud2l0aFdyYXAodmFsdWUpKTtcblxuICAgIHRoaXMub3JpZW50YXRpb24kXG4gICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpXG4gICAgICAuc3Vic2NyaWJlKHZhbHVlID0+IHRoaXMubGlzdEtleU1hbmFnZXIud2l0aEhvcml6b250YWxPcmllbnRhdGlvbih2YWx1ZSkpO1xuXG4gICAgdGhpcy5zbGlkZXMkXG4gICAgICAucGlwZShcbiAgICAgICAgdGFrZVVudGlsKHRoaXMuZGVzdHJveSQpLFxuICAgICAgICBmaWx0ZXIodmFsdWUgPT4gdmFsdWUgJiYgdmFsdWUgPCB0aGlzLnNsaWRlc0xpc3QubGVuZ3RoKVxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSh2YWx1ZSA9PiB0aGlzLnJlc2V0U2xpZGVzKHZhbHVlKSk7XG4gIH1cblxuICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5kZXN0cm95JC5uZXh0KCk7XG4gICAgdGhpcy5kZXN0cm95JC5jb21wbGV0ZSgpO1xuICB9XG5cbiAgcHVibGljIG5leHQoKTogdm9pZCB7XG4gICAgdGhpcy5nb3RvKERpcmVjdGlvbi5SaWdodCk7XG4gIH1cblxuICBwdWJsaWMgcHJldmlvdXMoKTogdm9pZCB7XG4gICAgdGhpcy5nb3RvKERpcmVjdGlvbi5MZWZ0KTtcbiAgfVxuXG4gIHB1YmxpYyBzbGlkZVRvKGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLmdvdG8oRGlyZWN0aW9uLkluZGV4LCBpbmRleCk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdrZXl1cCcsIFsnJGV2ZW50J10pXG4gIHB1YmxpYyBvbktleVVwKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgaWYgKHRoaXMudXNlS2V5Ym9hcmQgJiYgIXRoaXMucGxheWluZykge1xuICAgICAgdGhpcy5saXN0S2V5TWFuYWdlci5vbktleWRvd24oZXZlbnQpO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlZW50ZXInKVxuICBwdWJsaWMgb25Nb3VzZUVudGVyKCk6IHZvaWQge1xuICAgIHRoaXMuc3RvcFRpbWVyKCk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdtb3VzZWxlYXZlJylcbiAgcHVibGljIG9uTW91c2VMZWF2ZSgpOiB2b2lkIHtcbiAgICB0aGlzLnN0YXJ0VGltZXIodGhpcy5fYXV0b3BsYXkpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignbW91c2V3aGVlbCcsIFsnJGV2ZW50J10pXG4gIHB1YmxpYyBvbk1vdXNlV2hlZWwoZXZlbnQ6IE1vdXNlV2hlZWxFdmVudCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnVzZU1vdXNlV2hlZWwpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7IC8vIHByZXZlbnQgd2luZG93IHRvIHNjcm9sbFxuICAgICAgY29uc3Qgw47ClCA9IE1hdGguc2lnbihldmVudC53aGVlbERlbHRhKTtcblxuICAgICAgaWYgKMOOwpQgPCAwKSB7XG4gICAgICAgIHRoaXMubmV4dCgpO1xuICAgICAgfSBlbHNlIGlmICjDjsKUID4gMCkge1xuICAgICAgICB0aGlzLnByZXZpb3VzKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignd2luZG93OnJlc2l6ZScsIFsnJGV2ZW50J10pXG4gIHB1YmxpYyBvblJlc2l6ZShldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICAvLyBSZXNldCBjYXJvdXNlbCB3aGVuIHdpbmRvdyBpcyByZXNpemVkXG4gICAgLy8gaW4gb3JkZXIgdG8gYXZvaWQgbWFqb3IgZ2xpdGNoZXMuXG4gICAgdGhpcy5zbGlkZVRvKDApO1xuICB9XG5cbiAgcHVibGljIG9uUGFuKGV2ZW50OiBhbnksIHNsaWRlRWxlbTogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2lzc3Vlcy8xMDU0MSNpc3N1ZWNvbW1lbnQtMzQ2NTM5MjQyXG4gICAgLy8gaWYgeSB2ZWxvY2l0eSBpcyBncmVhdGVyLCBpdCdzIGEgcGFudXAvcGFuZG93biwgc28gaWdub3JlLlxuICAgIGlmIChNYXRoLmFicyhldmVudC52ZWxvY2l0eVkpID4gTWF0aC5hYnMoZXZlbnQudmVsb2NpdHlYKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsZXQgw47ClHggPSBldmVudC5kZWx0YVg7XG4gICAgaWYgKHRoaXMuaXNPdXRPZkJvdW5kcygpKSB7XG4gICAgICDDjsKUeCAqPSAwLjI7IC8vIGRlY2VsZXJhdGUgbW92ZW1lbnQ7XG4gICAgfVxuXG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShzbGlkZUVsZW0sICdjdXJzb3InLCAnZ3JhYmJpbmcnKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKFxuICAgICAgdGhpcy5jYXJvdXNlbExpc3QubmF0aXZlRWxlbWVudCxcbiAgICAgICd0cmFuc2Zvcm0nLFxuICAgICAgdGhpcy5nZXRUcmFuc2xhdGlvbih0aGlzLmdldE9mZnNldCgpICsgw47ClHgpXG4gICAgKTtcbiAgfVxuXG4gIHB1YmxpYyBvblBhbkVuZChldmVudDogYW55LCBzbGlkZUVsZW06IEhUTUxFbGVtZW50KTogdm9pZCB7XG4gICAgdGhpcy5yZW5kZXJlci5yZW1vdmVTdHlsZShzbGlkZUVsZW0sICdjdXJzb3InKTtcblxuICAgIGlmIChcbiAgICAgICF0aGlzLmlzT3V0T2ZCb3VuZHMoKSAmJlxuICAgICAgTWF0aC5hYnMoZXZlbnQuZGVsdGFYKSA+IHRoaXMuZ2V0V2lkdGgoKSAqIDAuMjVcbiAgICApIHtcbiAgICAgIGlmIChldmVudC5kZWx0YVggPD0gMCkge1xuICAgICAgICB0aGlzLm5leHQoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGhpcy5wcmV2aW91cygpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnBsYXlBbmltYXRpb24oKTsgLy8gc2xpZGUgYmFjaywgZG9uJ3QgY2hhbmdlIGN1cnJlbnQgaW5kZXhcbiAgfVxuXG4gIHByaXZhdGUgaXNPdXRPZkJvdW5kcygpOiBib29sZWFuIHtcbiAgICBjb25zdCBzaWduID0gdGhpcy5vcmllbnRhdGlvbiA9PT0gJ3J0bCcgPyAtMSA6IDE7XG4gICAgY29uc3QgbGVmdCA9XG4gICAgICBzaWduICpcbiAgICAgICh0aGlzLmNhcm91c2VsTGlzdC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQgLVxuICAgICAgICB0aGlzLmNhcm91c2VsTGlzdC5uYXRpdmVFbGVtZW50Lm9mZnNldFBhcmVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgICAgICAgIC5sZWZ0KTtcbiAgICBjb25zdCBsYXN0SW5kZXggPSB0aGlzLnNsaWRlc0xpc3QubGVuZ3RoIC0gMTtcbiAgICBjb25zdCB3aWR0aCA9IC10aGlzLmdldFdpZHRoKCkgKiBsYXN0SW5kZXg7XG5cbiAgICByZXR1cm4gKFxuICAgICAgKHRoaXMubGlzdEtleU1hbmFnZXIuYWN0aXZlSXRlbUluZGV4ID09PSAwICYmIGxlZnQgPj0gMCkgfHxcbiAgICAgICh0aGlzLmxpc3RLZXlNYW5hZ2VyLmFjdGl2ZUl0ZW1JbmRleCA9PT0gbGFzdEluZGV4ICYmIGxlZnQgPD0gd2lkdGgpXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgaXNWaXNpYmxlKCk6IGJvb2xlYW4ge1xuICAgIGlmICghaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IGVsZW0gPSB0aGlzLmNhcm91c2VsQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQ7XG4gICAgY29uc3QgZG9jVmlld1RvcCA9IHdpbmRvdy5wYWdlWU9mZnNldDtcbiAgICBjb25zdCBkb2NWaWV3Qm90dG9tID0gZG9jVmlld1RvcCArIHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICBjb25zdCBlbGVtT2Zmc2V0ID0gZWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBjb25zdCBlbGVtVG9wID0gZG9jVmlld1RvcCArIGVsZW1PZmZzZXQudG9wO1xuICAgIGNvbnN0IGVsZW1Cb3R0b20gPSBlbGVtVG9wICsgZWxlbU9mZnNldC5oZWlnaHQ7XG5cbiAgICByZXR1cm4gZWxlbUJvdHRvbSA8PSBkb2NWaWV3Qm90dG9tIHx8IGVsZW1Ub3AgPj0gZG9jVmlld1RvcDtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0T2Zmc2V0KCk6IG51bWJlciB7XG4gICAgY29uc3Qgb2Zmc2V0ID0gdGhpcy5saXN0S2V5TWFuYWdlci5hY3RpdmVJdGVtSW5kZXggKiB0aGlzLmdldFdpZHRoKCk7XG4gICAgY29uc3Qgc2lnbiA9IHRoaXMub3JpZW50YXRpb24gPT09ICdydGwnID8gMSA6IC0xO1xuICAgIHJldHVybiBzaWduICogb2Zmc2V0O1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRUcmFuc2xhdGlvbihvZmZzZXQ6IG51bWJlcik6IHN0cmluZyB7XG4gICAgcmV0dXJuIGB0cmFuc2xhdGVYKCR7b2Zmc2V0fXB4KWA7XG4gIH1cblxuICBwcml2YXRlIGdldFdpZHRoKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuY2Fyb3VzZWxDb250YWluZXIubmF0aXZlRWxlbWVudC5jbGllbnRXaWR0aDtcbiAgfVxuXG4gIHByaXZhdGUgZ290byhkaXJlY3Rpb246IERpcmVjdGlvbiwgaW5kZXg/OiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMucGxheWluZykge1xuICAgICAgY29uc3QgcnRsID0gdGhpcy5vcmllbnRhdGlvbiA9PT0gJ3J0bCc7XG5cbiAgICAgIHN3aXRjaCAoZGlyZWN0aW9uKSB7XG4gICAgICAgIGNhc2UgRGlyZWN0aW9uLkxlZnQ6XG4gICAgICAgICAgcmV0dXJuIHJ0bFxuICAgICAgICAgICAgPyB0aGlzLmxpc3RLZXlNYW5hZ2VyLnNldE5leHRJdGVtQWN0aXZlKClcbiAgICAgICAgICAgIDogdGhpcy5saXN0S2V5TWFuYWdlci5zZXRQcmV2aW91c0l0ZW1BY3RpdmUoKTtcbiAgICAgICAgY2FzZSBEaXJlY3Rpb24uUmlnaHQ6XG4gICAgICAgICAgcmV0dXJuIHJ0bFxuICAgICAgICAgICAgPyB0aGlzLmxpc3RLZXlNYW5hZ2VyLnNldFByZXZpb3VzSXRlbUFjdGl2ZSgpXG4gICAgICAgICAgICA6IHRoaXMubGlzdEtleU1hbmFnZXIuc2V0TmV4dEl0ZW1BY3RpdmUoKTtcbiAgICAgICAgY2FzZSBEaXJlY3Rpb24uSW5kZXg6XG4gICAgICAgICAgcmV0dXJuIHRoaXMubGlzdEtleU1hbmFnZXIuc2V0QWN0aXZlSXRlbShpbmRleCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBwbGF5QW5pbWF0aW9uKCk6IHZvaWQge1xuICAgIGNvbnN0IHRyYW5zbGF0aW9uID0gdGhpcy5nZXRUcmFuc2xhdGlvbih0aGlzLmdldE9mZnNldCgpKTtcbiAgICBjb25zdCBmYWN0b3J5ID0gdGhpcy5hbmltYXRpb25CdWlsZGVyLmJ1aWxkKFxuICAgICAgYW5pbWF0ZSh0aGlzLnRpbWluZ3MsIHN0eWxlKHsgdHJhbnNmb3JtOiB0cmFuc2xhdGlvbiB9KSlcbiAgICApO1xuICAgIGNvbnN0IGFuaW1hdGlvbiA9IGZhY3RvcnkuY3JlYXRlKHRoaXMuY2Fyb3VzZWxMaXN0Lm5hdGl2ZUVsZW1lbnQpO1xuXG4gICAgYW5pbWF0aW9uLm9uU3RhcnQoKCkgPT4gKHRoaXMucGxheWluZyA9IHRydWUpKTtcbiAgICBhbmltYXRpb24ub25Eb25lKCgpID0+IHtcbiAgICAgIHRoaXMuY2hhbmdlLmVtaXQodGhpcy5jdXJyZW50SW5kZXgpO1xuICAgICAgdGhpcy5wbGF5aW5nID0gZmFsc2U7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKFxuICAgICAgICB0aGlzLmNhcm91c2VsTGlzdC5uYXRpdmVFbGVtZW50LFxuICAgICAgICAndHJhbnNmb3JtJyxcbiAgICAgICAgdHJhbnNsYXRpb25cbiAgICAgICk7XG4gICAgICBhbmltYXRpb24uZGVzdHJveSgpO1xuICAgIH0pO1xuICAgIGFuaW1hdGlvbi5wbGF5KCk7XG4gIH1cblxuICBwcml2YXRlIHJlc2V0U2xpZGVzKHNsaWRlczogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5zbGlkZXNMaXN0LnJlc2V0KHRoaXMuc2xpZGVzTGlzdC50b0FycmF5KCkuc2xpY2UoMCwgc2xpZGVzKSk7XG4gIH1cblxuICBwcml2YXRlIHJlc2V0VGltZXIodmFsdWU6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMudGltZXIkID0gaW50ZXJ2YWwodmFsdWUpO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGFydFRpbWVyKGF1dG9wbGF5OiBib29sZWFuKTogdm9pZCB7XG4gICAgaWYgKCFhdXRvcGxheSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMudGltZXIkXG4gICAgICAucGlwZShcbiAgICAgICAgdGFrZVVudGlsKHRoaXMudGltZXJTdG9wJCksXG4gICAgICAgIHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSxcbiAgICAgICAgZmlsdGVyKCgpID0+IHRoaXMuaXNWaXNpYmxlKCkpXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5saXN0S2V5TWFuYWdlci53aXRoV3JhcCh0cnVlKS5zZXROZXh0SXRlbUFjdGl2ZSgpO1xuICAgICAgICB0aGlzLmxpc3RLZXlNYW5hZ2VyLndpdGhXcmFwKHRoaXMubG9vcCk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgc3RvcFRpbWVyKCk6IHZvaWQge1xuICAgIHRoaXMudGltZXJTdG9wJC5uZXh0KCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTWF0QnV0dG9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvYnV0dG9uJztcbmltcG9ydCB7IE1hdEljb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9pY29uJztcblxuaW1wb3J0IHsgTWF0Q2Fyb3VzZWxDb21wb25lbnQgfSBmcm9tICcuL2Nhcm91c2VsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXRDYXJvdXNlbFNsaWRlQ29tcG9uZW50IH0gZnJvbSAnLi9jYXJvdXNlbC1zbGlkZS9jYXJvdXNlbC1zbGlkZS5jb21wb25lbnQnO1xuaW1wb3J0IHtcbiAgSGFtbWVyR2VzdHVyZUNvbmZpZyxcbiAgSEFNTUVSX0dFU1RVUkVfQ09ORklHXG59IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHsgTW9kdWxlV2l0aFByb3ZpZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvbXBpbGVyL3NyYy9jb3JlJztcblxuLy8gaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvMTA1NDEjaXNzdWVjb21tZW50LTMwMDc2MTM4N1xuZXhwb3J0IGNsYXNzIE1hdENhcm91c2VsSGFtbWVyQ29uZmlnIGV4dGVuZHMgSGFtbWVyR2VzdHVyZUNvbmZpZyB7XG4gIG92ZXJyaWRlcyA9IHtcbiAgICBwaW5jaDogeyBlbmFibGU6IGZhbHNlIH0sXG4gICAgcm90YXRlOiB7IGVuYWJsZTogZmFsc2UgfVxuICB9O1xufVxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbTWF0Q2Fyb3VzZWxDb21wb25lbnQsIE1hdENhcm91c2VsU2xpZGVDb21wb25lbnRdLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBNYXRCdXR0b25Nb2R1bGUsIE1hdEljb25Nb2R1bGVdLFxuICBleHBvcnRzOiBbTWF0Q2Fyb3VzZWxDb21wb25lbnQsIE1hdENhcm91c2VsU2xpZGVDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIE1hdENhcm91c2VsTW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBNYXRDYXJvdXNlbE1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7IHByb3ZpZGU6IEhBTU1FUl9HRVNUVVJFX0NPTkZJRywgdXNlQ2xhc3M6IE1hdENhcm91c2VsSGFtbWVyQ29uZmlnIH1cbiAgICAgIF1cbiAgICB9O1xuICB9XG59XG4iXSwibmFtZXMiOlsidHNsaWJfMS5fX2V4dGVuZHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUNBO0lBeUJFLG1DQUFtQixTQUF1QjtRQUF2QixjQUFTLEdBQVQsU0FBUyxDQUFjO1FBTjFCLGlCQUFZLEdBQUcsV0FBVyxDQUFDO1FBQzNCLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLGFBQVEsR0FBRyxLQUFLLENBQUM7S0FLaEM7Ozs7SUFFTSw0Q0FBUTs7O0lBQWY7UUFDRSxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDZCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsd0JBQXdCLENBQUMsV0FBUSxJQUFJLENBQUMsS0FBSyxRQUFJLENBQUMsQ0FBQztTQUM5RTtLQUNGOztnQkFyQkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxvQkFBb0I7b0JBQzlCLG1WQUE4Qzs7aUJBRS9DOzs7O2dCQVJRLFlBQVk7Ozt3QkFXbEIsS0FBSzsrQkFDTCxLQUFLOzhCQUNMLEtBQUs7MkJBQ0wsS0FBSzs4QkFFTCxTQUFTLFNBQUMsV0FBVzs7SUFVeEIsZ0NBQUM7Q0F0QkQ7Ozs7OztBQ1pBOztJQTRCRSxPQUFJO0lBQ0osUUFBSztJQUNMLFFBQUs7Ozs7O0FBR1A7SUFnSEUsOEJBQ1UsZ0JBQWtDLEVBQ2xDLFFBQW1CLEVBQ0UsVUFBVTtRQUYvQixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDRSxlQUFVLEdBQVYsVUFBVSxDQUFBO1FBNUd6QixZQUFPLEdBQUcsZUFBZSxDQUFDO1FBdUIxQixlQUFVLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLG1CQUFjLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLFVBQUssR0FBaUIsUUFBUSxDQUFDO1FBVy9CLHdCQUFtQixHQUFHLElBQUksQ0FBQztRQUMzQixlQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLGdCQUFXLEdBQUcsTUFB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
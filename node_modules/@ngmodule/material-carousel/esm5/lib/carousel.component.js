/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { animate, style, AnimationBuilder } from '@angular/animations';
import { ListKeyManager } from '@angular/cdk/a11y';
import { isPlatformBrowser } from '@angular/common';
import { Component, ContentChildren, ElementRef, EventEmitter, HostListener, Inject, Input, Output, PLATFORM_ID, QueryList, Renderer2, ViewChild } from '@angular/core';
import { interval, BehaviorSubject, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { MatCarouselSlideComponent } from './carousel-slide/carousel-slide.component';
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
export { MatCarouselComponent };
if (false) {
    /** @type {?} */
    MatCarouselComponent.prototype.timings;
    /** @type {?} */
    MatCarouselComponent.prototype.svgIconOverrides;
    /** @type {?} */
    MatCarouselComponent.prototype.hideArrows;
    /** @type {?} */
    MatCarouselComponent.prototype.hideIndicators;
    /** @type {?} */
    MatCarouselComponent.prototype.color;
    /** @type {?} */
    MatCarouselComponent.prototype.maintainAspectRatio;
    /** @type {?} */
    MatCarouselComponent.prototype.proportion;
    /** @type {?} */
    MatCarouselComponent.prototype.slideHeight;
    /** @type {?} */
    MatCarouselComponent.prototype.useKeyboard;
    /** @type {?} */
    MatCarouselComponent.prototype.useMouseWheel;
    /** @type {?} */
    MatCarouselComponent.prototype.change;
    /** @type {?} */
    MatCarouselComponent.prototype.slidesList;
    /**
     * @type {?}
     * @private
     */
    MatCarouselComponent.prototype.carouselContainer;
    /**
     * @type {?}
     * @private
     */
    MatCarouselComponent.prototype.carouselList;
    /** @type {?} */
    MatCarouselComponent.prototype.listKeyManager;
    /**
     * @type {?}
     * @private
     */
    MatCarouselComponent.prototype._autoplay;
    /**
     * @type {?}
     * @private
     */
    MatCarouselComponent.prototype.autoplay$;
    /**
     * @type {?}
     * @private
     */
    MatCarouselComponent.prototype.interval$;
    /**
     * @type {?}
     * @private
     */
    MatCarouselComponent.prototype.slides$;
    /**
     * @type {?}
     * @private
     */
    MatCarouselComponent.prototype._maxWidth;
    /**
     * @type {?}
     * @private
     */
    MatCarouselComponent.prototype.maxWidth$;
    /**
     * @type {?}
     * @private
     */
    MatCarouselComponent.prototype._loop;
    /**
     * @type {?}
     * @private
     */
    MatCarouselComponent.prototype.loop$;
    /**
     * @type {?}
     * @private
     */
    MatCarouselComponent.prototype._orientation;
    /**
     * @type {?}
     * @private
     */
    MatCarouselComponent.prototype.orientation$;
    /**
     * @type {?}
     * @private
     */
    MatCarouselComponent.prototype.timer$;
    /**
     * @type {?}
     * @private
     */
    MatCarouselComponent.prototype.timerStop$;
    /**
     * @type {?}
     * @private
     */
    MatCarouselComponent.prototype.destroy$;
    /**
     * @type {?}
     * @private
     */
    MatCarouselComponent.prototype.playing;
    /**
     * @type {?}
     * @private
     */
    MatCarouselComponent.prototype.animationBuilder;
    /**
     * @type {?}
     * @private
     */
    MatCarouselComponent.prototype.renderer;
    /**
     * @type {?}
     * @private
     */
    MatCarouselComponent.prototype.platformId;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2Fyb3VzZWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nbW9kdWxlL21hdGVyaWFsLWNhcm91c2VsLyIsInNvdXJjZXMiOlsibGliL2Nhcm91c2VsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN2RSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbkQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDcEQsT0FBTyxFQUdMLFNBQVMsRUFDVCxlQUFlLEVBQ2YsVUFBVSxFQUNWLFlBQVksRUFDWixZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFFTCxNQUFNLEVBQ04sV0FBVyxFQUNYLFNBQVMsRUFDVCxTQUFTLEVBQ1QsU0FBUyxFQUNWLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxRQUFRLEVBQUUsZUFBZSxFQUFjLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN0RSxPQUFPLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBR25ELE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLDJDQUEyQyxDQUFDOzs7SUFHcEYsT0FBSTtJQUNKLFFBQUs7SUFDTCxRQUFLOzs7OztBQUdQO0lBZ0hFLDhCQUNVLGdCQUFrQyxFQUNsQyxRQUFtQixFQUNFLFVBQVU7UUFGL0IscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQ0UsZUFBVSxHQUFWLFVBQVUsQ0FBQTtRQTVHekIsWUFBTyxHQUFHLGVBQWUsQ0FBQztRQXVCMUIsZUFBVSxHQUFHLElBQUksQ0FBQztRQUNsQixtQkFBYyxHQUFHLElBQUksQ0FBQztRQUN0QixVQUFLLEdBQWlCLFFBQVEsQ0FBQztRQVcv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QXdCOzs7OztJQUd0QixnREFBMEM7Ozs7O0lBQzFDLHdDQUEyQjs7Ozs7SUFDM0IsMENBQXVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYW5pbWF0ZSwgc3R5bGUsIEFuaW1hdGlvbkJ1aWxkZXIgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7IExpc3RLZXlNYW5hZ2VyIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSG9zdExpc3RlbmVyLFxuICBJbmplY3QsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE91dHB1dCxcbiAgUExBVEZPUk1fSUQsXG4gIFF1ZXJ5TGlzdCxcbiAgUmVuZGVyZXIyLFxuICBWaWV3Q2hpbGRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUaGVtZVBhbGV0dGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcbmltcG9ydCB7IGludGVydmFsLCBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBNYXRDYXJvdXNlbCwgT3JpZW50YXRpb24sIFN2Z0ljb25PdmVycmlkZXMgfSBmcm9tICcuL2Nhcm91c2VsJztcbmltcG9ydCB7IE1hdENhcm91c2VsU2xpZGVDb21wb25lbnQgfSBmcm9tICcuL2Nhcm91c2VsLXNsaWRlL2Nhcm91c2VsLXNsaWRlLmNvbXBvbmVudCc7XG5cbmVudW0gRGlyZWN0aW9uIHtcbiAgTGVmdCxcbiAgUmlnaHQsXG4gIEluZGV4XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21hdC1jYXJvdXNlbCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9jYXJvdXNlbC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2Nhcm91c2VsLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgTWF0Q2Fyb3VzZWxDb21wb25lbnRcbiAgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBBZnRlclZpZXdJbml0LCBNYXRDYXJvdXNlbCwgT25EZXN0cm95IHtcbiAgQElucHV0KCkgcHVibGljIHRpbWluZ3MgPSAnMjUwbXMgZWFzZS1pbic7XG4gIEBJbnB1dCgpIHB1YmxpYyBzdmdJY29uT3ZlcnJpZGVzOiBTdmdJY29uT3ZlcnJpZGVzO1xuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBzZXQgYXV0b3BsYXkodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLmF1dG9wbGF5JC5uZXh0KHZhbHVlKTtcbiAgICB0aGlzLl9hdXRvcGxheSA9IHZhbHVlO1xuICB9XG5cbiAgQElucHV0KClcbiAgcHVibGljIHNldCBpbnRlcnZhbCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5pbnRlcnZhbCQubmV4dCh2YWx1ZSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGxvb3AoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2xvb3A7XG4gIH1cbiAgQElucHV0KClcbiAgcHVibGljIHNldCBsb29wKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5sb29wJC5uZXh0KHZhbHVlKTtcbiAgICB0aGlzLl9sb29wID0gdmFsdWU7XG4gIH1cblxuICBASW5wdXQoKSBwdWJsaWMgaGlkZUFycm93cyA9IHRydWU7XG4gIEBJbnB1dCgpIHB1YmxpYyBoaWRlSW5kaWNhdG9ycyA9IHRydWU7XG4gIEBJbnB1dCgpIHB1YmxpYyBjb2xvcjogVGhlbWVQYWxldHRlID0gJ2FjY2VudCc7XG5cbiAgcHVibGljIGdldCBtYXhXaWR0aCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9tYXhXaWR0aDtcbiAgfVxuICBASW5wdXQoKVxuICBwdWJsaWMgc2V0IG1heFdpZHRoKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9tYXhXaWR0aCA9IHZhbHVlO1xuICAgIHRoaXMubWF4V2lkdGgkLm5leHQoKTtcbiAgfVxuXG4gIEBJbnB1dCgpIHB1YmxpYyBtYWludGFpbkFzcGVjdFJhdGlvID0gdHJ1ZTtcbiAgQElucHV0KCkgcHVibGljIHByb3BvcnRpb24gPSAyNTtcbiAgQElucHV0KCkgcHVibGljIHNsaWRlSGVpZ2h0ID0gJzEwMCUnO1xuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBzZXQgc2xpZGVzKHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLnNsaWRlcyQubmV4dCh2YWx1ZSk7XG4gIH1cblxuICBASW5wdXQoKSBwdWJsaWMgdXNlS2V5Ym9hcmQgPSBmYWxzZTtcbiAgQElucHV0KCkgcHVibGljIHVzZU1vdXNlV2hlZWwgPSBmYWxzZTtcblxuICBwdWJsaWMgZ2V0IG9yaWVudGF0aW9uKCk6IE9yaWVudGF0aW9uIHtcbiAgICByZXR1cm4gdGhpcy5fb3JpZW50YXRpb247XG4gIH1cbiAgQElucHV0KClcbiAgcHVibGljIHNldCBvcmllbnRhdGlvbih2YWx1ZTogT3JpZW50YXRpb24pIHtcbiAgICB0aGlzLm9yaWVudGF0aW9uJC5uZXh0KHZhbHVlKTtcbiAgICB0aGlzLl9vcmllbnRhdGlvbiA9IHZhbHVlO1xuICB9XG5cbiAgQE91dHB1dCgpXG4gIHB1YmxpYyBjaGFuZ2U6IEV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG5cbiAgcHVibGljIGdldCBjdXJyZW50SW5kZXgoKTogbnVtYmVyIHtcbiAgICBpZiAodGhpcy5saXN0S2V5TWFuYWdlcikge1xuICAgICAgcmV0dXJuIHRoaXMubGlzdEtleU1hbmFnZXIuYWN0aXZlSXRlbUluZGV4O1xuICAgIH1cblxuICAgIHJldHVybiAwO1xuICB9XG4gIHB1YmxpYyBnZXQgY3VycmVudFNsaWRlKCk6IE1hdENhcm91c2VsU2xpZGVDb21wb25lbnQge1xuICAgIGlmICh0aGlzLmxpc3RLZXlNYW5hZ2VyKSB7XG4gICAgICByZXR1cm4gdGhpcy5saXN0S2V5TWFuYWdlci5hY3RpdmVJdGVtO1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgQENvbnRlbnRDaGlsZHJlbihNYXRDYXJvdXNlbFNsaWRlQ29tcG9uZW50KSBwdWJsaWMgc2xpZGVzTGlzdDogUXVlcnlMaXN0PFxuICAgIE1hdENhcm91c2VsU2xpZGVDb21wb25lbnRcbiAgPjtcbiAgQFZpZXdDaGlsZCgnY2Fyb3VzZWxDb250YWluZXInKSBwcml2YXRlIGNhcm91c2VsQ29udGFpbmVyOiBFbGVtZW50UmVmPFxuICAgIEhUTUxEaXZFbGVtZW50XG4gID47XG4gIEBWaWV3Q2hpbGQoJ2Nhcm91c2VsTGlzdCcpIHByaXZhdGUgY2Fyb3VzZWxMaXN0OiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PjtcbiAgcHVibGljIGxpc3RLZXlNYW5hZ2VyOiBMaXN0S2V5TWFuYWdlcjxNYXRDYXJvdXNlbFNsaWRlQ29tcG9uZW50PjtcblxuICBwcml2YXRlIF9hdXRvcGxheSA9IHRydWU7XG4gIHByaXZhdGUgYXV0b3BsYXkkID0gbmV3IFN1YmplY3Q8Ym9vbGVhbj4oKTtcblxuICBwcml2YXRlIGludGVydmFsJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPig1MDAwKTtcbiAgcHJpdmF0ZSBzbGlkZXMkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KG51bGwpO1xuXG4gIHByaXZhdGUgX21heFdpZHRoID0gJ2F1dG8nO1xuICBwcml2YXRlIG1heFdpZHRoJCA9IG5ldyBTdWJqZWN0PG5ldmVyPigpO1xuXG4gIHByaXZhdGUgX2xvb3AgPSB0cnVlO1xuICBwcml2YXRlIGxvb3AkID0gbmV3IFN1YmplY3Q8Ym9vbGVhbj4oKTtcblxuICBwcml2YXRlIF9vcmllbnRhdGlvbjogT3JpZW50YXRpb24gPSAnbHRyJztcbiAgcHJpdmF0ZSBvcmllbnRhdGlvbiQgPSBuZXcgU3ViamVjdDxPcmllbnRhdGlvbj4oKTtcblxuICBwcml2YXRlIHRpbWVyJDogT2JzZXJ2YWJsZTxudW1iZXI+O1xuICBwcml2YXRlIHRpbWVyU3RvcCQgPSBuZXcgU3ViamVjdDxuZXZlcj4oKTtcblxuICBwcml2YXRlIGRlc3Ryb3kkID0gbmV3IFN1YmplY3Q8bmV2ZXI+KCk7XG4gIHByaXZhdGUgcGxheWluZyA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgYW5pbWF0aW9uQnVpbGRlcjogQW5pbWF0aW9uQnVpbGRlcixcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkXG4gICkge31cblxuICBwdWJsaWMgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQge1xuICAgIHRoaXMubGlzdEtleU1hbmFnZXIgPSBuZXcgTGlzdEtleU1hbmFnZXIodGhpcy5zbGlkZXNMaXN0KVxuICAgICAgLndpdGhWZXJ0aWNhbE9yaWVudGF0aW9uKGZhbHNlKVxuICAgICAgLndpdGhIb3Jpem9udGFsT3JpZW50YXRpb24odGhpcy5fb3JpZW50YXRpb24pXG4gICAgICAud2l0aFdyYXAodGhpcy5fbG9vcCk7XG5cbiAgICB0aGlzLmxpc3RLZXlNYW5hZ2VyLnVwZGF0ZUFjdGl2ZUl0ZW0oMCk7XG4gICAgdGhpcy5saXN0S2V5TWFuYWdlci5jaGFuZ2VcbiAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSlcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5wbGF5QW5pbWF0aW9uKCkpO1xuICB9XG5cbiAgcHVibGljIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmF1dG9wbGF5JC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSkuc3Vic2NyaWJlKHZhbHVlID0+IHtcbiAgICAgIHRoaXMuc3RvcFRpbWVyKCk7XG4gICAgICB0aGlzLnN0YXJ0VGltZXIodmFsdWUpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5pbnRlcnZhbCQucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpLnN1YnNjcmliZSh2YWx1ZSA9PiB7XG4gICAgICB0aGlzLnN0b3BUaW1lcigpO1xuICAgICAgdGhpcy5yZXNldFRpbWVyKHZhbHVlKTtcbiAgICAgIHRoaXMuc3RhcnRUaW1lcih0aGlzLl9hdXRvcGxheSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLm1heFdpZHRoJFxuICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLnNsaWRlVG8oMCkpO1xuXG4gICAgdGhpcy5sb29wJFxuICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKVxuICAgICAgLnN1YnNjcmliZSh2YWx1ZSA9PiB0aGlzLmxpc3RLZXlNYW5hZ2VyLndpdGhXcmFwKHZhbHVlKSk7XG5cbiAgICB0aGlzLm9yaWVudGF0aW9uJFxuICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKVxuICAgICAgLnN1YnNjcmliZSh2YWx1ZSA9PiB0aGlzLmxpc3RLZXlNYW5hZ2VyLndpdGhIb3Jpem9udGFsT3JpZW50YXRpb24odmFsdWUpKTtcblxuICAgIHRoaXMuc2xpZGVzJFxuICAgICAgLnBpcGUoXG4gICAgICAgIHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSxcbiAgICAgICAgZmlsdGVyKHZhbHVlID0+IHZhbHVlICYmIHZhbHVlIDwgdGhpcy5zbGlkZXNMaXN0Lmxlbmd0aClcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUodmFsdWUgPT4gdGhpcy5yZXNldFNsaWRlcyh2YWx1ZSkpO1xuICB9XG5cbiAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuZGVzdHJveSQubmV4dCgpO1xuICAgIHRoaXMuZGVzdHJveSQuY29tcGxldGUoKTtcbiAgfVxuXG4gIHB1YmxpYyBuZXh0KCk6IHZvaWQge1xuICAgIHRoaXMuZ290byhEaXJlY3Rpb24uUmlnaHQpO1xuICB9XG5cbiAgcHVibGljIHByZXZpb3VzKCk6IHZvaWQge1xuICAgIHRoaXMuZ290byhEaXJlY3Rpb24uTGVmdCk7XG4gIH1cblxuICBwdWJsaWMgc2xpZGVUbyhpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5nb3RvKERpcmVjdGlvbi5JbmRleCwgaW5kZXgpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcigna2V5dXAnLCBbJyRldmVudCddKVxuICBwdWJsaWMgb25LZXlVcChldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnVzZUtleWJvYXJkICYmICF0aGlzLnBsYXlpbmcpIHtcbiAgICAgIHRoaXMubGlzdEtleU1hbmFnZXIub25LZXlkb3duKGV2ZW50KTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdtb3VzZWVudGVyJylcbiAgcHVibGljIG9uTW91c2VFbnRlcigpOiB2b2lkIHtcbiAgICB0aGlzLnN0b3BUaW1lcigpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignbW91c2VsZWF2ZScpXG4gIHB1YmxpYyBvbk1vdXNlTGVhdmUoKTogdm9pZCB7XG4gICAgdGhpcy5zdGFydFRpbWVyKHRoaXMuX2F1dG9wbGF5KTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNld2hlZWwnLCBbJyRldmVudCddKVxuICBwdWJsaWMgb25Nb3VzZVdoZWVsKGV2ZW50OiBNb3VzZVdoZWVsRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAodGhpcy51c2VNb3VzZVdoZWVsKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpOyAvLyBwcmV2ZW50IHdpbmRvdyB0byBzY3JvbGxcbiAgICAgIGNvbnN0IM6UID0gTWF0aC5zaWduKGV2ZW50LndoZWVsRGVsdGEpO1xuXG4gICAgICBpZiAozpQgPCAwKSB7XG4gICAgICAgIHRoaXMubmV4dCgpO1xuICAgICAgfSBlbHNlIGlmICjOlCA+IDApIHtcbiAgICAgICAgdGhpcy5wcmV2aW91cygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzpyZXNpemUnLCBbJyRldmVudCddKVxuICBwdWJsaWMgb25SZXNpemUoZXZlbnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgLy8gUmVzZXQgY2Fyb3VzZWwgd2hlbiB3aW5kb3cgaXMgcmVzaXplZFxuICAgIC8vIGluIG9yZGVyIHRvIGF2b2lkIG1ham9yIGdsaXRjaGVzLlxuICAgIHRoaXMuc2xpZGVUbygwKTtcbiAgfVxuXG4gIHB1YmxpYyBvblBhbihldmVudDogYW55LCBzbGlkZUVsZW06IEhUTUxFbGVtZW50KTogdm9pZCB7XG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvMTA1NDEjaXNzdWVjb21tZW50LTM0NjUzOTI0MlxuICAgIC8vIGlmIHkgdmVsb2NpdHkgaXMgZ3JlYXRlciwgaXQncyBhIHBhbnVwL3BhbmRvd24sIHNvIGlnbm9yZS5cbiAgICBpZiAoTWF0aC5hYnMoZXZlbnQudmVsb2NpdHlZKSA+IE1hdGguYWJzKGV2ZW50LnZlbG9jaXR5WCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbGV0IM6UeCA9IGV2ZW50LmRlbHRhWDtcbiAgICBpZiAodGhpcy5pc091dE9mQm91bmRzKCkpIHtcbiAgICAgIM6UeCAqPSAwLjI7IC8vIGRlY2VsZXJhdGUgbW92ZW1lbnQ7XG4gICAgfVxuXG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShzbGlkZUVsZW0sICdjdXJzb3InLCAnZ3JhYmJpbmcnKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKFxuICAgICAgdGhpcy5jYXJvdXNlbExpc3QubmF0aXZlRWxlbWVudCxcbiAgICAgICd0cmFuc2Zvcm0nLFxuICAgICAgdGhpcy5nZXRUcmFuc2xhdGlvbih0aGlzLmdldE9mZnNldCgpICsgzpR4KVxuICAgICk7XG4gIH1cblxuICBwdWJsaWMgb25QYW5FbmQoZXZlbnQ6IGFueSwgc2xpZGVFbGVtOiBIVE1MRWxlbWVudCk6IHZvaWQge1xuICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlU3R5bGUoc2xpZGVFbGVtLCAnY3Vyc29yJyk7XG5cbiAgICBpZiAoXG4gICAgICAhdGhpcy5pc091dE9mQm91bmRzKCkgJiZcbiAgICAgIE1hdGguYWJzKGV2ZW50LmRlbHRhWCkgPiB0aGlzLmdldFdpZHRoKCkgKiAwLjI1XG4gICAgKSB7XG4gICAgICBpZiAoZXZlbnQuZGVsdGFYIDw9IDApIHtcbiAgICAgICAgdGhpcy5uZXh0KCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRoaXMucHJldmlvdXMoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5wbGF5QW5pbWF0aW9uKCk7IC8vIHNsaWRlIGJhY2ssIGRvbid0IGNoYW5nZSBjdXJyZW50IGluZGV4XG4gIH1cblxuICBwcml2YXRlIGlzT3V0T2ZCb3VuZHMoKTogYm9vbGVhbiB7XG4gICAgY29uc3Qgc2lnbiA9IHRoaXMub3JpZW50YXRpb24gPT09ICdydGwnID8gLTEgOiAxO1xuICAgIGNvbnN0IGxlZnQgPVxuICAgICAgc2lnbiAqXG4gICAgICAodGhpcy5jYXJvdXNlbExpc3QubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0IC1cbiAgICAgICAgdGhpcy5jYXJvdXNlbExpc3QubmF0aXZlRWxlbWVudC5vZmZzZXRQYXJlbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICAgICAgICAubGVmdCk7XG4gICAgY29uc3QgbGFzdEluZGV4ID0gdGhpcy5zbGlkZXNMaXN0Lmxlbmd0aCAtIDE7XG4gICAgY29uc3Qgd2lkdGggPSAtdGhpcy5nZXRXaWR0aCgpICogbGFzdEluZGV4O1xuXG4gICAgcmV0dXJuIChcbiAgICAgICh0aGlzLmxpc3RLZXlNYW5hZ2VyLmFjdGl2ZUl0ZW1JbmRleCA9PT0gMCAmJiBsZWZ0ID49IDApIHx8XG4gICAgICAodGhpcy5saXN0S2V5TWFuYWdlci5hY3RpdmVJdGVtSW5kZXggPT09IGxhc3RJbmRleCAmJiBsZWZ0IDw9IHdpZHRoKVxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIGlzVmlzaWJsZSgpOiBib29sZWFuIHtcbiAgICBpZiAoIWlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCBlbGVtID0gdGhpcy5jYXJvdXNlbENvbnRhaW5lci5uYXRpdmVFbGVtZW50O1xuICAgIGNvbnN0IGRvY1ZpZXdUb3AgPSB3aW5kb3cucGFnZVlPZmZzZXQ7XG4gICAgY29uc3QgZG9jVmlld0JvdHRvbSA9IGRvY1ZpZXdUb3AgKyB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgY29uc3QgZWxlbU9mZnNldCA9IGVsZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgY29uc3QgZWxlbVRvcCA9IGRvY1ZpZXdUb3AgKyBlbGVtT2Zmc2V0LnRvcDtcbiAgICBjb25zdCBlbGVtQm90dG9tID0gZWxlbVRvcCArIGVsZW1PZmZzZXQuaGVpZ2h0O1xuXG4gICAgcmV0dXJuIGVsZW1Cb3R0b20gPD0gZG9jVmlld0JvdHRvbSB8fCBlbGVtVG9wID49IGRvY1ZpZXdUb3A7XG4gIH1cblxuICBwcml2YXRlIGdldE9mZnNldCgpOiBudW1iZXIge1xuICAgIGNvbnN0IG9mZnNldCA9IHRoaXMubGlzdEtleU1hbmFnZXIuYWN0aXZlSXRlbUluZGV4ICogdGhpcy5nZXRXaWR0aCgpO1xuICAgIGNvbnN0IHNpZ24gPSB0aGlzLm9yaWVudGF0aW9uID09PSAncnRsJyA/IDEgOiAtMTtcbiAgICByZXR1cm4gc2lnbiAqIG9mZnNldDtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0VHJhbnNsYXRpb24ob2Zmc2V0OiBudW1iZXIpOiBzdHJpbmcge1xuICAgIHJldHVybiBgdHJhbnNsYXRlWCgke29mZnNldH1weClgO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRXaWR0aCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmNhcm91c2VsQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQuY2xpZW50V2lkdGg7XG4gIH1cblxuICBwcml2YXRlIGdvdG8oZGlyZWN0aW9uOiBEaXJlY3Rpb24sIGluZGV4PzogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLnBsYXlpbmcpIHtcbiAgICAgIGNvbnN0IHJ0bCA9IHRoaXMub3JpZW50YXRpb24gPT09ICdydGwnO1xuXG4gICAgICBzd2l0Y2ggKGRpcmVjdGlvbikge1xuICAgICAgICBjYXNlIERpcmVjdGlvbi5MZWZ0OlxuICAgICAgICAgIHJldHVybiBydGxcbiAgICAgICAgICAgID8gdGhpcy5saXN0S2V5TWFuYWdlci5zZXROZXh0SXRlbUFjdGl2ZSgpXG4gICAgICAgICAgICA6IHRoaXMubGlzdEtleU1hbmFnZXIuc2V0UHJldmlvdXNJdGVtQWN0aXZlKCk7XG4gICAgICAgIGNhc2UgRGlyZWN0aW9uLlJpZ2h0OlxuICAgICAgICAgIHJldHVybiBydGxcbiAgICAgICAgICAgID8gdGhpcy5saXN0S2V5TWFuYWdlci5zZXRQcmV2aW91c0l0ZW1BY3RpdmUoKVxuICAgICAgICAgICAgOiB0aGlzLmxpc3RLZXlNYW5hZ2VyLnNldE5leHRJdGVtQWN0aXZlKCk7XG4gICAgICAgIGNhc2UgRGlyZWN0aW9uLkluZGV4OlxuICAgICAgICAgIHJldHVybiB0aGlzLmxpc3RLZXlNYW5hZ2VyLnNldEFjdGl2ZUl0ZW0oaW5kZXgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcGxheUFuaW1hdGlvbigpOiB2b2lkIHtcbiAgICBjb25zdCB0cmFuc2xhdGlvbiA9IHRoaXMuZ2V0VHJhbnNsYXRpb24odGhpcy5nZXRPZmZzZXQoKSk7XG4gICAgY29uc3QgZmFjdG9yeSA9IHRoaXMuYW5pbWF0aW9uQnVpbGRlci5idWlsZChcbiAgICAgIGFuaW1hdGUodGhpcy50aW1pbmdzLCBzdHlsZSh7IHRyYW5zZm9ybTogdHJhbnNsYXRpb24gfSkpXG4gICAgKTtcbiAgICBjb25zdCBhbmltYXRpb24gPSBmYWN0b3J5LmNyZWF0ZSh0aGlzLmNhcm91c2VsTGlzdC5uYXRpdmVFbGVtZW50KTtcblxuICAgIGFuaW1hdGlvbi5vblN0YXJ0KCgpID0+ICh0aGlzLnBsYXlpbmcgPSB0cnVlKSk7XG4gICAgYW5pbWF0aW9uLm9uRG9uZSgoKSA9PiB7XG4gICAgICB0aGlzLmNoYW5nZS5lbWl0KHRoaXMuY3VycmVudEluZGV4KTtcbiAgICAgIHRoaXMucGxheWluZyA9IGZhbHNlO1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShcbiAgICAgICAgdGhpcy5jYXJvdXNlbExpc3QubmF0aXZlRWxlbWVudCxcbiAgICAgICAgJ3RyYW5zZm9ybScsXG4gICAgICAgIHRyYW5zbGF0aW9uXG4gICAgICApO1xuICAgICAgYW5pbWF0aW9uLmRlc3Ryb3koKTtcbiAgICB9KTtcbiAgICBhbmltYXRpb24ucGxheSgpO1xuICB9XG5cbiAgcHJpdmF0ZSByZXNldFNsaWRlcyhzbGlkZXM6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuc2xpZGVzTGlzdC5yZXNldCh0aGlzLnNsaWRlc0xpc3QudG9BcnJheSgpLnNsaWNlKDAsIHNsaWRlcykpO1xuICB9XG5cbiAgcHJpdmF0ZSByZXNldFRpbWVyKHZhbHVlOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLnRpbWVyJCA9IGludGVydmFsKHZhbHVlKTtcbiAgfVxuXG4gIHByaXZhdGUgc3RhcnRUaW1lcihhdXRvcGxheTogYm9vbGVhbik6IHZvaWQge1xuICAgIGlmICghYXV0b3BsYXkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnRpbWVyJFxuICAgICAgLnBpcGUoXG4gICAgICAgIHRha2VVbnRpbCh0aGlzLnRpbWVyU3RvcCQpLFxuICAgICAgICB0YWtlVW50aWwodGhpcy5kZXN0cm95JCksXG4gICAgICAgIGZpbHRlcigoKSA9PiB0aGlzLmlzVmlzaWJsZSgpKVxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMubGlzdEtleU1hbmFnZXIud2l0aFdyYXAodHJ1ZSkuc2V0TmV4dEl0ZW1BY3RpdmUoKTtcbiAgICAgICAgdGhpcy5saXN0S2V5TWFuYWdlci53aXRoV3JhcCh0aGlzLmxvb3ApO1xuICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHN0b3BUaW1lcigpOiB2b2lkIHtcbiAgICB0aGlzLnRpbWVyU3RvcCQubmV4dCgpO1xuICB9XG59XG4iXX0=
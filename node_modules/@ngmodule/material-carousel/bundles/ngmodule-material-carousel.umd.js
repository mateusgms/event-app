(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/platform-browser'), require('@angular/animations'), require('@angular/cdk/a11y'), require('@angular/common'), require('rxjs'), require('rxjs/operators'), require('@angular/material/button'), require('@angular/material/icon')) :
    typeof define === 'function' && define.amd ? define('@ngmodule/material-carousel', ['exports', '@angular/core', '@angular/platform-browser', '@angular/animations', '@angular/cdk/a11y', '@angular/common', 'rxjs', 'rxjs/operators', '@angular/material/button', '@angular/material/icon'], factory) :
    (factory((global.ngmodule = global.ngmodule || {}, global.ngmodule['material-carousel'] = {}),global.ng.core,global.ng.platformBrowser,global.ng.animations,global.ng.cdk.a11y,global.ng.common,global.rxjs,global.rxjs.operators,global.ng.material.button,global.ng.material.icon));
}(this, (function (exports,core,platformBrowser,animations,a11y,common,rxjs,operators,button,icon) { 'use strict';

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
            { type: core.Component, args: [{
                        selector: 'mat-carousel-slide',
                        template: "<ng-template>\n  <div class=\"carousel-slide\" [style.background-image]=\"image\">\n    <div class=\"carousel-slide-content\"><ng-content></ng-content></div>\n    <div\n      *ngIf=\"!hideOverlay\"\n      class=\"carousel-slide-overlay\"\n      [style.background-color]=\"overlayColor\"\n    ></div>\n  </div>\n</ng-template>\n",
                        styles: [".carousel-slide{width:100%;height:100%;position:absolute;z-index:auto;background-size:cover;background-repeat:no-repeat;background-position:center}.carousel-slide-overlay{width:100%;height:100%;position:absolute;z-index:auto}.carousel-slide-content{width:100%;height:100%;position:absolute;z-index:1}"]
                    }] }
        ];
        /** @nocollapse */
        MatCarouselSlideComponent.ctorParameters = function () {
            return [
                { type: platformBrowser.DomSanitizer }
            ];
        };
        MatCarouselSlideComponent.propDecorators = {
            image: [{ type: core.Input }],
            overlayColor: [{ type: core.Input }],
            hideOverlay: [{ type: core.Input }],
            disabled: [{ type: core.Input }],
            templateRef: [{ type: core.ViewChild, args: [core.TemplateRef,] }]
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
            this.change = new core.EventEmitter();
            this._autoplay = true;
            this.autoplay$ = new rxjs.Subject();
            this.interval$ = new rxjs.BehaviorSubject(5000);
            this.slides$ = new rxjs.BehaviorSubject(null);
            this._maxWidth = 'auto';
            this.maxWidth$ = new rxjs.Subject();
            this._loop = true;
            this.loop$ = new rxjs.Subject();
            this._orientation = 'ltr';
            this.orientation$ = new rxjs.Subject();
            this.timerStop$ = new rxjs.Subject();
            this.destroy$ = new rxjs.Subject();
            this.playing = false;
        }
        Object.defineProperty(MatCarouselComponent.prototype, "autoplay", {
            set: /**
             * @param {?} value
             * @return {?}
             */ function (value) {
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
             */ function (value) {
                this.interval$.next(value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MatCarouselComponent.prototype, "loop", {
            get: /**
             * @return {?}
             */ function () {
                return this._loop;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */ function (value) {
                this.loop$.next(value);
                this._loop = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MatCarouselComponent.prototype, "maxWidth", {
            get: /**
             * @return {?}
             */ function () {
                return this._maxWidth;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */ function (value) {
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
             */ function (value) {
                this.slides$.next(value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MatCarouselComponent.prototype, "orientation", {
            get: /**
             * @return {?}
             */ function () {
                return this._orientation;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */ function (value) {
                this.orientation$.next(value);
                this._orientation = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MatCarouselComponent.prototype, "currentIndex", {
            get: /**
             * @return {?}
             */ function () {
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
             */ function () {
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
                this.listKeyManager = new a11y.ListKeyManager(this.slidesList)
                    .withVerticalOrientation(false)
                    .withHorizontalOrientation(this._orientation)
                    .withWrap(this._loop);
                this.listKeyManager.updateActiveItem(0);
                this.listKeyManager.change
                    .pipe(operators.takeUntil(this.destroy$))
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
                this.autoplay$.pipe(operators.takeUntil(this.destroy$)).subscribe(function (value) {
                    _this.stopTimer();
                    _this.startTimer(value);
                });
                this.interval$.pipe(operators.takeUntil(this.destroy$)).subscribe(function (value) {
                    _this.stopTimer();
                    _this.resetTimer(value);
                    _this.startTimer(_this._autoplay);
                });
                this.maxWidth$
                    .pipe(operators.takeUntil(this.destroy$))
                    .subscribe(function () { return _this.slideTo(0); });
                this.loop$
                    .pipe(operators.takeUntil(this.destroy$))
                    .subscribe(function (value) { return _this.listKeyManager.withWrap(value); });
                this.orientation$
                    .pipe(operators.takeUntil(this.destroy$))
                    .subscribe(function (value) { return _this.listKeyManager.withHorizontalOrientation(value); });
                this.slides$
                    .pipe(operators.takeUntil(this.destroy$), operators.filter(function (value) { return value && value < _this.slidesList.length; }))
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
                if (!common.isPlatformBrowser(this.platformId)) {
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
                var factory = this.animationBuilder.build(animations.animate(this.timings, animations.style({ transform: translation })));
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
                this.timer$ = rxjs.interval(value);
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
                    .pipe(operators.takeUntil(this.timerStop$), operators.takeUntil(this.destroy$), operators.filter(function () { return _this.isVisible(); }))
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
            { type: core.Component, args: [{
                        selector: 'mat-carousel',
                        template: "<div\n  #carouselContainer\n  class=\"carousel\"\n  tabindex=\"0\"\n  [style.max-width]=\"maxWidth\"\n  [style.height]=\"!maintainAspectRatio ? '100%' : 'auto'\"\n>\n  <ul\n    #carouselList\n    class=\"carousel-list\"\n    role=\"listbox\"\n    [style.flex-direction]=\"orientation === 'rtl' ? 'row-reverse' : 'row'\"\n    [style.height]=\"!maintainAspectRatio ? '100%' : 'auto'\"\n  >\n    <li\n      #carouselSlide\n      *ngFor=\"let slide of slidesList\"\n      class=\"carousel-slide\"\n      role=\"option\"\n      [style.padding-bottom]=\"maintainAspectRatio && proportion ? proportion + '%': '0px'\"\n      [style.height]=\"!maintainAspectRatio && slideHeight ? slideHeight : '0px'\"\n      (panleft)=\"onPan($event, carouselSlide)\"\n      (panright)=\"onPan($event, carouselSlide)\"\n      (panend)=\"onPanEnd($event, carouselSlide)\"\n      (pancancel)=\"onPanEnd($event, carouselSlide)\"\n    >\n      <ng-container [ngTemplateOutlet]=\"slide.templateRef\"></ng-container>\n    </li>\n  </ul>\n\n  <button\n    *ngIf=\"!hideArrows\"\n    mat-icon-button\n    type=\"button\"\n    tabindex=\"-1\"\n    [color]=\"color\"\n    [disabled]=\"!loop && currentIndex == 0\"\n    (click)=\"previous()\"\n  >\n    <mat-icon\n      *ngIf=\"svgIconOverrides?.arrowBack; else: defaultArrowBack\"\n      [svgIcon]=\"svgIconOverrides.arrowBack\"\n    ></mat-icon>\n    <ng-template #defaultArrowBack>\n      <mat-icon>arrow_back</mat-icon>\n    </ng-template>\n  </button>\n  <button\n    *ngIf=\"!hideArrows\"\n    mat-icon-button\n    type=\"button\"\n    tabindex=\"-1\"\n    [color]=\"color\"\n    [disabled]=\"!loop && currentIndex == slidesList.length - 1\"\n    (click)=\"next()\"\n  >\n    <mat-icon\n      *ngIf=\"svgIconOverrides?.arrowForward; else: defaultArrowForward\"\n      [svgIcon]=\"svgIconOverrides.arrowForward\"\n    ></mat-icon>\n    <ng-template #defaultArrowForward>\n      <mat-icon>arrow_forward</mat-icon>\n    </ng-template>\n  </button>\n\n  <div\n    *ngIf=\"!hideIndicators\"\n    class=\"carousel-indicators\"\n    tabindex=\"-1\"\n    [style.flex-direction]=\"orientation === 'rtl' ? 'row-reverse' : 'row'\"\n  >\n    <button\n      *ngFor=\"let slide of slidesList; let i = index\"\n      type=\"button\"\n      tabindex=\"-1\"\n      mat-mini-fab\n      [color]=\"color\"\n      [disabled]=\"i == currentIndex\"\n      (click)=\"slideTo(i)\"\n      (focus)=\"carouselContainer.focus()\"\n    ></button>\n  </div>\n</div>\n",
                        styles: [".carousel{width:100%;position:relative;overflow:hidden;outline:0}.carousel>button{position:absolute;z-index:1;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%)}.carousel>button:first-of-type{left:30px}.carousel>button:last-of-type{right:30px}.carousel-list{width:100%;margin:0;padding:0;list-style:none;display:flex;position:relative}.carousel-slide{width:100%;height:0;display:flex;flex-shrink:0;position:relative}.carousel-slide:hover{cursor:-webkit-grab;cursor:grab}.carousel-indicators{display:flex;position:absolute;bottom:15px;z-index:1;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%);outline:0}.carousel-indicators>button{width:10px;height:10px;margin:7.5px}"]
                    }] }
        ];
        /** @nocollapse */
        MatCarouselComponent.ctorParameters = function () {
            return [
                { type: animations.AnimationBuilder },
                { type: core.Renderer2 },
                { type: undefined, decorators: [{ type: core.Inject, args: [core.PLATFORM_ID,] }] }
            ];
        };
        MatCarouselComponent.propDecorators = {
            timings: [{ type: core.Input }],
            svgIconOverrides: [{ type: core.Input }],
            autoplay: [{ type: core.Input }],
            interval: [{ type: core.Input }],
            loop: [{ type: core.Input }],
            hideArrows: [{ type: core.Input }],
            hideIndicators: [{ type: core.Input }],
            color: [{ type: core.Input }],
            maxWidth: [{ type: core.Input }],
            maintainAspectRatio: [{ type: core.Input }],
            proportion: [{ type: core.Input }],
            slideHeight: [{ type: core.Input }],
            slides: [{ type: core.Input }],
            useKeyboard: [{ type: core.Input }],
            useMouseWheel: [{ type: core.Input }],
            orientation: [{ type: core.Input }],
            change: [{ type: core.Output }],
            slidesList: [{ type: core.ContentChildren, args: [MatCarouselSlideComponent,] }],
            carouselContainer: [{ type: core.ViewChild, args: ['carouselContainer',] }],
            carouselList: [{ type: core.ViewChild, args: ['carouselList',] }],
            onKeyUp: [{ type: core.HostListener, args: ['keyup', ['$event'],] }],
            onMouseEnter: [{ type: core.HostListener, args: ['mouseenter',] }],
            onMouseLeave: [{ type: core.HostListener, args: ['mouseleave',] }],
            onMouseWheel: [{ type: core.HostListener, args: ['mousewheel', ['$event'],] }],
            onResize: [{ type: core.HostListener, args: ['window:resize', ['$event'],] }]
        };
        return MatCarouselComponent;
    }());

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

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
    }(platformBrowser.HammerGestureConfig));
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
                        { provide: platformBrowser.HAMMER_GESTURE_CONFIG, useClass: MatCarouselHammerConfig }
                    ]
                };
            };
        MatCarouselModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [MatCarouselComponent, MatCarouselSlideComponent],
                        imports: [common.CommonModule, button.MatButtonModule, icon.MatIconModule],
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

    exports.MatCarouselComponent = MatCarouselComponent;
    exports.MatCarouselHammerConfig = MatCarouselHammerConfig;
    exports.MatCarouselModule = MatCarouselModule;
    exports.MatCarouselSlideComponent = MatCarouselSlideComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdtb2R1bGUtbWF0ZXJpYWwtY2Fyb3VzZWwudW1kLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9Abmdtb2R1bGUvbWF0ZXJpYWwtY2Fyb3VzZWwvbGliL2Nhcm91c2VsLXNsaWRlL2Nhcm91c2VsLXNsaWRlLmNvbXBvbmVudC50cyIsIm5nOi8vQG5nbW9kdWxlL21hdGVyaWFsLWNhcm91c2VsL2xpYi9jYXJvdXNlbC5jb21wb25lbnQudHMiLCJub2RlX21vZHVsZXMvdHNsaWIvdHNsaWIuZXM2LmpzIiwibmc6Ly9Abmdtb2R1bGUvbWF0ZXJpYWwtY2Fyb3VzZWwvbGliL2Nhcm91c2VsLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMaXN0S2V5TWFuYWdlck9wdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIE9uSW5pdCxcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdDaGlsZFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERvbVNhbml0aXplciwgU2FmZVN0eWxlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5cbmltcG9ydCB7IE1hdENhcm91c2VsU2xpZGUgfSBmcm9tICcuL2Nhcm91c2VsLXNsaWRlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWF0LWNhcm91c2VsLXNsaWRlJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2Nhcm91c2VsLXNsaWRlLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vY2Fyb3VzZWwtc2xpZGUuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBNYXRDYXJvdXNlbFNsaWRlQ29tcG9uZW50XG4gIGltcGxlbWVudHMgTGlzdEtleU1hbmFnZXJPcHRpb24sIE1hdENhcm91c2VsU2xpZGUsIE9uSW5pdCB7XG4gIEBJbnB1dCgpIHB1YmxpYyBpbWFnZTogU2FmZVN0eWxlO1xuICBASW5wdXQoKSBwdWJsaWMgb3ZlcmxheUNvbG9yID0gJyMwMDAwMDA0MCc7XG4gIEBJbnB1dCgpIHB1YmxpYyBoaWRlT3ZlcmxheSA9IGZhbHNlO1xuICBASW5wdXQoKSBwdWJsaWMgZGlzYWJsZWQgPSBmYWxzZTsgLy8gaW1wbGVtZW50cyBMaXN0S2V5TWFuYWdlck9wdGlvblxuXG4gIEBWaWV3Q2hpbGQoVGVtcGxhdGVSZWYpIHB1YmxpYyB0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8YW55PjtcbiAgICBcbiAgY29uc3RydWN0b3IocHVibGljIHNhbml0aXplcjogRG9tU2FuaXRpemVyKSB7XG4gIH1cblxuICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaW1hZ2UpIHtcbiAgICAgIHRoaXMuaW1hZ2UgPSB0aGlzLnNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0U3R5bGUoYHVybChcIiR7dGhpcy5pbWFnZX1cIilgKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IGFuaW1hdGUsIHN0eWxlLCBBbmltYXRpb25CdWlsZGVyIH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBMaXN0S2V5TWFuYWdlciB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gIEFmdGVyQ29udGVudEluaXQsXG4gIEFmdGVyVmlld0luaXQsXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkcmVuLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIEhvc3RMaXN0ZW5lcixcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPdXRwdXQsXG4gIFBMQVRGT1JNX0lELFxuICBRdWVyeUxpc3QsXG4gIFJlbmRlcmVyMixcbiAgVmlld0NoaWxkXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVGhlbWVQYWxldHRlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5pbXBvcnQgeyBpbnRlcnZhbCwgQmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgTWF0Q2Fyb3VzZWwsIE9yaWVudGF0aW9uLCBTdmdJY29uT3ZlcnJpZGVzIH0gZnJvbSAnLi9jYXJvdXNlbCc7XG5pbXBvcnQgeyBNYXRDYXJvdXNlbFNsaWRlQ29tcG9uZW50IH0gZnJvbSAnLi9jYXJvdXNlbC1zbGlkZS9jYXJvdXNlbC1zbGlkZS5jb21wb25lbnQnO1xuXG5lbnVtIERpcmVjdGlvbiB7XG4gIExlZnQsXG4gIFJpZ2h0LFxuICBJbmRleFxufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtYXQtY2Fyb3VzZWwnLFxuICB0ZW1wbGF0ZVVybDogJy4vY2Fyb3VzZWwuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9jYXJvdXNlbC5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIE1hdENhcm91c2VsQ29tcG9uZW50XG4gIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgQWZ0ZXJWaWV3SW5pdCwgTWF0Q2Fyb3VzZWwsIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgpIHB1YmxpYyB0aW1pbmdzID0gJzI1MG1zIGVhc2UtaW4nO1xuICBASW5wdXQoKSBwdWJsaWMgc3ZnSWNvbk92ZXJyaWRlczogU3ZnSWNvbk92ZXJyaWRlcztcblxuICBASW5wdXQoKVxuICBwdWJsaWMgc2V0IGF1dG9wbGF5KHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5hdXRvcGxheSQubmV4dCh2YWx1ZSk7XG4gICAgdGhpcy5fYXV0b3BsYXkgPSB2YWx1ZTtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBzZXQgaW50ZXJ2YWwodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMuaW50ZXJ2YWwkLm5leHQodmFsdWUpO1xuICB9XG5cbiAgcHVibGljIGdldCBsb29wKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9sb29wO1xuICB9XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBzZXQgbG9vcCh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMubG9vcCQubmV4dCh2YWx1ZSk7XG4gICAgdGhpcy5fbG9vcCA9IHZhbHVlO1xuICB9XG5cbiAgQElucHV0KCkgcHVibGljIGhpZGVBcnJvd3MgPSB0cnVlO1xuICBASW5wdXQoKSBwdWJsaWMgaGlkZUluZGljYXRvcnMgPSB0cnVlO1xuICBASW5wdXQoKSBwdWJsaWMgY29sb3I6IFRoZW1lUGFsZXR0ZSA9ICdhY2NlbnQnO1xuXG4gIHB1YmxpYyBnZXQgbWF4V2lkdGgoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fbWF4V2lkdGg7XG4gIH1cbiAgQElucHV0KClcbiAgcHVibGljIHNldCBtYXhXaWR0aCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fbWF4V2lkdGggPSB2YWx1ZTtcbiAgICB0aGlzLm1heFdpZHRoJC5uZXh0KCk7XG4gIH1cblxuICBASW5wdXQoKSBwdWJsaWMgbWFpbnRhaW5Bc3BlY3RSYXRpbyA9IHRydWU7XG4gIEBJbnB1dCgpIHB1YmxpYyBwcm9wb3J0aW9uID0gMjU7XG4gIEBJbnB1dCgpIHB1YmxpYyBzbGlkZUhlaWdodCA9ICcxMDAlJztcblxuICBASW5wdXQoKVxuICBwdWJsaWMgc2V0IHNsaWRlcyh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5zbGlkZXMkLm5leHQodmFsdWUpO1xuICB9XG5cbiAgQElucHV0KCkgcHVibGljIHVzZUtleWJvYXJkID0gZmFsc2U7XG4gIEBJbnB1dCgpIHB1YmxpYyB1c2VNb3VzZVdoZWVsID0gZmFsc2U7XG5cbiAgcHVibGljIGdldCBvcmllbnRhdGlvbigpOiBPcmllbnRhdGlvbiB7XG4gICAgcmV0dXJuIHRoaXMuX29yaWVudGF0aW9uO1xuICB9XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBzZXQgb3JpZW50YXRpb24odmFsdWU6IE9yaWVudGF0aW9uKSB7XG4gICAgdGhpcy5vcmllbnRhdGlvbiQubmV4dCh2YWx1ZSk7XG4gICAgdGhpcy5fb3JpZW50YXRpb24gPSB2YWx1ZTtcbiAgfVxuXG4gIEBPdXRwdXQoKVxuICBwdWJsaWMgY2hhbmdlOiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuXG4gIHB1YmxpYyBnZXQgY3VycmVudEluZGV4KCk6IG51bWJlciB7XG4gICAgaWYgKHRoaXMubGlzdEtleU1hbmFnZXIpIHtcbiAgICAgIHJldHVybiB0aGlzLmxpc3RLZXlNYW5hZ2VyLmFjdGl2ZUl0ZW1JbmRleDtcbiAgICB9XG5cbiAgICByZXR1cm4gMDtcbiAgfVxuICBwdWJsaWMgZ2V0IGN1cnJlbnRTbGlkZSgpOiBNYXRDYXJvdXNlbFNsaWRlQ29tcG9uZW50IHtcbiAgICBpZiAodGhpcy5saXN0S2V5TWFuYWdlcikge1xuICAgICAgcmV0dXJuIHRoaXMubGlzdEtleU1hbmFnZXIuYWN0aXZlSXRlbTtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIEBDb250ZW50Q2hpbGRyZW4oTWF0Q2Fyb3VzZWxTbGlkZUNvbXBvbmVudCkgcHVibGljIHNsaWRlc0xpc3Q6IFF1ZXJ5TGlzdDxcbiAgICBNYXRDYXJvdXNlbFNsaWRlQ29tcG9uZW50XG4gID47XG4gIEBWaWV3Q2hpbGQoJ2Nhcm91c2VsQ29udGFpbmVyJykgcHJpdmF0ZSBjYXJvdXNlbENvbnRhaW5lcjogRWxlbWVudFJlZjxcbiAgICBIVE1MRGl2RWxlbWVudFxuICA+O1xuICBAVmlld0NoaWxkKCdjYXJvdXNlbExpc3QnKSBwcml2YXRlIGNhcm91c2VsTGlzdDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD47XG4gIHB1YmxpYyBsaXN0S2V5TWFuYWdlcjogTGlzdEtleU1hbmFnZXI8TWF0Q2Fyb3VzZWxTbGlkZUNvbXBvbmVudD47XG5cbiAgcHJpdmF0ZSBfYXV0b3BsYXkgPSB0cnVlO1xuICBwcml2YXRlIGF1dG9wbGF5JCA9IG5ldyBTdWJqZWN0PGJvb2xlYW4+KCk7XG5cbiAgcHJpdmF0ZSBpbnRlcnZhbCQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oNTAwMCk7XG4gIHByaXZhdGUgc2xpZGVzJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPihudWxsKTtcblxuICBwcml2YXRlIF9tYXhXaWR0aCA9ICdhdXRvJztcbiAgcHJpdmF0ZSBtYXhXaWR0aCQgPSBuZXcgU3ViamVjdDxuZXZlcj4oKTtcblxuICBwcml2YXRlIF9sb29wID0gdHJ1ZTtcbiAgcHJpdmF0ZSBsb29wJCA9IG5ldyBTdWJqZWN0PGJvb2xlYW4+KCk7XG5cbiAgcHJpdmF0ZSBfb3JpZW50YXRpb246IE9yaWVudGF0aW9uID0gJ2x0cic7XG4gIHByaXZhdGUgb3JpZW50YXRpb24kID0gbmV3IFN1YmplY3Q8T3JpZW50YXRpb24+KCk7XG5cbiAgcHJpdmF0ZSB0aW1lciQ6IE9ic2VydmFibGU8bnVtYmVyPjtcbiAgcHJpdmF0ZSB0aW1lclN0b3AkID0gbmV3IFN1YmplY3Q8bmV2ZXI+KCk7XG5cbiAgcHJpdmF0ZSBkZXN0cm95JCA9IG5ldyBTdWJqZWN0PG5ldmVyPigpO1xuICBwcml2YXRlIHBsYXlpbmcgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGFuaW1hdGlvbkJ1aWxkZXI6IEFuaW1hdGlvbkJ1aWxkZXIsXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm1JZFxuICApIHt9XG5cbiAgcHVibGljIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmxpc3RLZXlNYW5hZ2VyID0gbmV3IExpc3RLZXlNYW5hZ2VyKHRoaXMuc2xpZGVzTGlzdClcbiAgICAgIC53aXRoVmVydGljYWxPcmllbnRhdGlvbihmYWxzZSlcbiAgICAgIC53aXRoSG9yaXpvbnRhbE9yaWVudGF0aW9uKHRoaXMuX29yaWVudGF0aW9uKVxuICAgICAgLndpdGhXcmFwKHRoaXMuX2xvb3ApO1xuXG4gICAgdGhpcy5saXN0S2V5TWFuYWdlci51cGRhdGVBY3RpdmVJdGVtKDApO1xuICAgIHRoaXMubGlzdEtleU1hbmFnZXIuY2hhbmdlXG4gICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMucGxheUFuaW1hdGlvbigpKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgdGhpcy5hdXRvcGxheSQucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpLnN1YnNjcmliZSh2YWx1ZSA9PiB7XG4gICAgICB0aGlzLnN0b3BUaW1lcigpO1xuICAgICAgdGhpcy5zdGFydFRpbWVyKHZhbHVlKTtcbiAgICB9KTtcblxuICAgIHRoaXMuaW50ZXJ2YWwkLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKS5zdWJzY3JpYmUodmFsdWUgPT4ge1xuICAgICAgdGhpcy5zdG9wVGltZXIoKTtcbiAgICAgIHRoaXMucmVzZXRUaW1lcih2YWx1ZSk7XG4gICAgICB0aGlzLnN0YXJ0VGltZXIodGhpcy5fYXV0b3BsYXkpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5tYXhXaWR0aCRcbiAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSlcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5zbGlkZVRvKDApKTtcblxuICAgIHRoaXMubG9vcCRcbiAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSlcbiAgICAgIC5zdWJzY3JpYmUodmFsdWUgPT4gdGhpcy5saXN0S2V5TWFuYWdlci53aXRoV3JhcCh2YWx1ZSkpO1xuXG4gICAgdGhpcy5vcmllbnRhdGlvbiRcbiAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSlcbiAgICAgIC5zdWJzY3JpYmUodmFsdWUgPT4gdGhpcy5saXN0S2V5TWFuYWdlci53aXRoSG9yaXpvbnRhbE9yaWVudGF0aW9uKHZhbHVlKSk7XG5cbiAgICB0aGlzLnNsaWRlcyRcbiAgICAgIC5waXBlKFxuICAgICAgICB0YWtlVW50aWwodGhpcy5kZXN0cm95JCksXG4gICAgICAgIGZpbHRlcih2YWx1ZSA9PiB2YWx1ZSAmJiB2YWx1ZSA8IHRoaXMuc2xpZGVzTGlzdC5sZW5ndGgpXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKHZhbHVlID0+IHRoaXMucmVzZXRTbGlkZXModmFsdWUpKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmRlc3Ryb3kkLm5leHQoKTtcbiAgICB0aGlzLmRlc3Ryb3kkLmNvbXBsZXRlKCk7XG4gIH1cblxuICBwdWJsaWMgbmV4dCgpOiB2b2lkIHtcbiAgICB0aGlzLmdvdG8oRGlyZWN0aW9uLlJpZ2h0KTtcbiAgfVxuXG4gIHB1YmxpYyBwcmV2aW91cygpOiB2b2lkIHtcbiAgICB0aGlzLmdvdG8oRGlyZWN0aW9uLkxlZnQpO1xuICB9XG5cbiAgcHVibGljIHNsaWRlVG8oaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuZ290byhEaXJlY3Rpb24uSW5kZXgsIGluZGV4KTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2tleXVwJywgWyckZXZlbnQnXSlcbiAgcHVibGljIG9uS2V5VXAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAodGhpcy51c2VLZXlib2FyZCAmJiAhdGhpcy5wbGF5aW5nKSB7XG4gICAgICB0aGlzLmxpc3RLZXlNYW5hZ2VyLm9uS2V5ZG93bihldmVudCk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignbW91c2VlbnRlcicpXG4gIHB1YmxpYyBvbk1vdXNlRW50ZXIoKTogdm9pZCB7XG4gICAgdGhpcy5zdG9wVGltZXIoKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlbGVhdmUnKVxuICBwdWJsaWMgb25Nb3VzZUxlYXZlKCk6IHZvaWQge1xuICAgIHRoaXMuc3RhcnRUaW1lcih0aGlzLl9hdXRvcGxheSk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdtb3VzZXdoZWVsJywgWyckZXZlbnQnXSlcbiAgcHVibGljIG9uTW91c2VXaGVlbChldmVudDogTW91c2VXaGVlbEV2ZW50KTogdm9pZCB7XG4gICAgaWYgKHRoaXMudXNlTW91c2VXaGVlbCkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTsgLy8gcHJldmVudCB3aW5kb3cgdG8gc2Nyb2xsXG4gICAgICBjb25zdCDDjsKUID0gTWF0aC5zaWduKGV2ZW50LndoZWVsRGVsdGEpO1xuXG4gICAgICBpZiAow47ClCA8IDApIHtcbiAgICAgICAgdGhpcy5uZXh0KCk7XG4gICAgICB9IGVsc2UgaWYgKMOOwpQgPiAwKSB7XG4gICAgICAgIHRoaXMucHJldmlvdXMoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCd3aW5kb3c6cmVzaXplJywgWyckZXZlbnQnXSlcbiAgcHVibGljIG9uUmVzaXplKGV2ZW50OiBFdmVudCk6IHZvaWQge1xuICAgIC8vIFJlc2V0IGNhcm91c2VsIHdoZW4gd2luZG93IGlzIHJlc2l6ZWRcbiAgICAvLyBpbiBvcmRlciB0byBhdm9pZCBtYWpvciBnbGl0Y2hlcy5cbiAgICB0aGlzLnNsaWRlVG8oMCk7XG4gIH1cblxuICBwdWJsaWMgb25QYW4oZXZlbnQ6IGFueSwgc2xpZGVFbGVtOiBIVE1MRWxlbWVudCk6IHZvaWQge1xuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzEwNTQxI2lzc3VlY29tbWVudC0zNDY1MzkyNDJcbiAgICAvLyBpZiB5IHZlbG9jaXR5IGlzIGdyZWF0ZXIsIGl0J3MgYSBwYW51cC9wYW5kb3duLCBzbyBpZ25vcmUuXG4gICAgaWYgKE1hdGguYWJzKGV2ZW50LnZlbG9jaXR5WSkgPiBNYXRoLmFicyhldmVudC52ZWxvY2l0eVgpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGxldCDDjsKUeCA9IGV2ZW50LmRlbHRhWDtcbiAgICBpZiAodGhpcy5pc091dE9mQm91bmRzKCkpIHtcbiAgICAgIMOOwpR4ICo9IDAuMjsgLy8gZGVjZWxlcmF0ZSBtb3ZlbWVudDtcbiAgICB9XG5cbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHNsaWRlRWxlbSwgJ2N1cnNvcicsICdncmFiYmluZycpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoXG4gICAgICB0aGlzLmNhcm91c2VsTGlzdC5uYXRpdmVFbGVtZW50LFxuICAgICAgJ3RyYW5zZm9ybScsXG4gICAgICB0aGlzLmdldFRyYW5zbGF0aW9uKHRoaXMuZ2V0T2Zmc2V0KCkgKyDDjsKUeClcbiAgICApO1xuICB9XG5cbiAgcHVibGljIG9uUGFuRW5kKGV2ZW50OiBhbnksIHNsaWRlRWxlbTogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZVN0eWxlKHNsaWRlRWxlbSwgJ2N1cnNvcicpO1xuXG4gICAgaWYgKFxuICAgICAgIXRoaXMuaXNPdXRPZkJvdW5kcygpICYmXG4gICAgICBNYXRoLmFicyhldmVudC5kZWx0YVgpID4gdGhpcy5nZXRXaWR0aCgpICogMC4yNVxuICAgICkge1xuICAgICAgaWYgKGV2ZW50LmRlbHRhWCA8PSAwKSB7XG4gICAgICAgIHRoaXMubmV4dCgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGlzLnByZXZpb3VzKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMucGxheUFuaW1hdGlvbigpOyAvLyBzbGlkZSBiYWNrLCBkb24ndCBjaGFuZ2UgY3VycmVudCBpbmRleFxuICB9XG5cbiAgcHJpdmF0ZSBpc091dE9mQm91bmRzKCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IHNpZ24gPSB0aGlzLm9yaWVudGF0aW9uID09PSAncnRsJyA/IC0xIDogMTtcbiAgICBjb25zdCBsZWZ0ID1cbiAgICAgIHNpZ24gKlxuICAgICAgKHRoaXMuY2Fyb3VzZWxMaXN0Lm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdCAtXG4gICAgICAgIHRoaXMuY2Fyb3VzZWxMaXN0Lm5hdGl2ZUVsZW1lbnQub2Zmc2V0UGFyZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgICAgICAgLmxlZnQpO1xuICAgIGNvbnN0IGxhc3RJbmRleCA9IHRoaXMuc2xpZGVzTGlzdC5sZW5ndGggLSAxO1xuICAgIGNvbnN0IHdpZHRoID0gLXRoaXMuZ2V0V2lkdGgoKSAqIGxhc3RJbmRleDtcblxuICAgIHJldHVybiAoXG4gICAgICAodGhpcy5saXN0S2V5TWFuYWdlci5hY3RpdmVJdGVtSW5kZXggPT09IDAgJiYgbGVmdCA+PSAwKSB8fFxuICAgICAgKHRoaXMubGlzdEtleU1hbmFnZXIuYWN0aXZlSXRlbUluZGV4ID09PSBsYXN0SW5kZXggJiYgbGVmdCA8PSB3aWR0aClcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBpc1Zpc2libGUoKTogYm9vbGVhbiB7XG4gICAgaWYgKCFpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgZWxlbSA9IHRoaXMuY2Fyb3VzZWxDb250YWluZXIubmF0aXZlRWxlbWVudDtcbiAgICBjb25zdCBkb2NWaWV3VG9wID0gd2luZG93LnBhZ2VZT2Zmc2V0O1xuICAgIGNvbnN0IGRvY1ZpZXdCb3R0b20gPSBkb2NWaWV3VG9wICsgd2luZG93LmlubmVySGVpZ2h0O1xuICAgIGNvbnN0IGVsZW1PZmZzZXQgPSBlbGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGNvbnN0IGVsZW1Ub3AgPSBkb2NWaWV3VG9wICsgZWxlbU9mZnNldC50b3A7XG4gICAgY29uc3QgZWxlbUJvdHRvbSA9IGVsZW1Ub3AgKyBlbGVtT2Zmc2V0LmhlaWdodDtcblxuICAgIHJldHVybiBlbGVtQm90dG9tIDw9IGRvY1ZpZXdCb3R0b20gfHwgZWxlbVRvcCA+PSBkb2NWaWV3VG9wO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRPZmZzZXQoKTogbnVtYmVyIHtcbiAgICBjb25zdCBvZmZzZXQgPSB0aGlzLmxpc3RLZXlNYW5hZ2VyLmFjdGl2ZUl0ZW1JbmRleCAqIHRoaXMuZ2V0V2lkdGgoKTtcbiAgICBjb25zdCBzaWduID0gdGhpcy5vcmllbnRhdGlvbiA9PT0gJ3J0bCcgPyAxIDogLTE7XG4gICAgcmV0dXJuIHNpZ24gKiBvZmZzZXQ7XG4gIH1cblxuICBwcml2YXRlIGdldFRyYW5zbGF0aW9uKG9mZnNldDogbnVtYmVyKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYHRyYW5zbGF0ZVgoJHtvZmZzZXR9cHgpYDtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0V2lkdGgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5jYXJvdXNlbENvbnRhaW5lci5uYXRpdmVFbGVtZW50LmNsaWVudFdpZHRoO1xuICB9XG5cbiAgcHJpdmF0ZSBnb3RvKGRpcmVjdGlvbjogRGlyZWN0aW9uLCBpbmRleD86IG51bWJlcik6IHZvaWQge1xuICAgIGlmICghdGhpcy5wbGF5aW5nKSB7XG4gICAgICBjb25zdCBydGwgPSB0aGlzLm9yaWVudGF0aW9uID09PSAncnRsJztcblxuICAgICAgc3dpdGNoIChkaXJlY3Rpb24pIHtcbiAgICAgICAgY2FzZSBEaXJlY3Rpb24uTGVmdDpcbiAgICAgICAgICByZXR1cm4gcnRsXG4gICAgICAgICAgICA/IHRoaXMubGlzdEtleU1hbmFnZXIuc2V0TmV4dEl0ZW1BY3RpdmUoKVxuICAgICAgICAgICAgOiB0aGlzLmxpc3RLZXlNYW5hZ2VyLnNldFByZXZpb3VzSXRlbUFjdGl2ZSgpO1xuICAgICAgICBjYXNlIERpcmVjdGlvbi5SaWdodDpcbiAgICAgICAgICByZXR1cm4gcnRsXG4gICAgICAgICAgICA/IHRoaXMubGlzdEtleU1hbmFnZXIuc2V0UHJldmlvdXNJdGVtQWN0aXZlKClcbiAgICAgICAgICAgIDogdGhpcy5saXN0S2V5TWFuYWdlci5zZXROZXh0SXRlbUFjdGl2ZSgpO1xuICAgICAgICBjYXNlIERpcmVjdGlvbi5JbmRleDpcbiAgICAgICAgICByZXR1cm4gdGhpcy5saXN0S2V5TWFuYWdlci5zZXRBY3RpdmVJdGVtKGluZGV4KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHBsYXlBbmltYXRpb24oKTogdm9pZCB7XG4gICAgY29uc3QgdHJhbnNsYXRpb24gPSB0aGlzLmdldFRyYW5zbGF0aW9uKHRoaXMuZ2V0T2Zmc2V0KCkpO1xuICAgIGNvbnN0IGZhY3RvcnkgPSB0aGlzLmFuaW1hdGlvbkJ1aWxkZXIuYnVpbGQoXG4gICAgICBhbmltYXRlKHRoaXMudGltaW5ncywgc3R5bGUoeyB0cmFuc2Zvcm06IHRyYW5zbGF0aW9uIH0pKVxuICAgICk7XG4gICAgY29uc3QgYW5pbWF0aW9uID0gZmFjdG9yeS5jcmVhdGUodGhpcy5jYXJvdXNlbExpc3QubmF0aXZlRWxlbWVudCk7XG5cbiAgICBhbmltYXRpb24ub25TdGFydCgoKSA9PiAodGhpcy5wbGF5aW5nID0gdHJ1ZSkpO1xuICAgIGFuaW1hdGlvbi5vbkRvbmUoKCkgPT4ge1xuICAgICAgdGhpcy5jaGFuZ2UuZW1pdCh0aGlzLmN1cnJlbnRJbmRleCk7XG4gICAgICB0aGlzLnBsYXlpbmcgPSBmYWxzZTtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoXG4gICAgICAgIHRoaXMuY2Fyb3VzZWxMaXN0Lm5hdGl2ZUVsZW1lbnQsXG4gICAgICAgICd0cmFuc2Zvcm0nLFxuICAgICAgICB0cmFuc2xhdGlvblxuICAgICAgKTtcbiAgICAgIGFuaW1hdGlvbi5kZXN0cm95KCk7XG4gICAgfSk7XG4gICAgYW5pbWF0aW9uLnBsYXkoKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVzZXRTbGlkZXMoc2xpZGVzOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLnNsaWRlc0xpc3QucmVzZXQodGhpcy5zbGlkZXNMaXN0LnRvQXJyYXkoKS5zbGljZSgwLCBzbGlkZXMpKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVzZXRUaW1lcih2YWx1ZTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy50aW1lciQgPSBpbnRlcnZhbCh2YWx1ZSk7XG4gIH1cblxuICBwcml2YXRlIHN0YXJ0VGltZXIoYXV0b3BsYXk6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBpZiAoIWF1dG9wbGF5KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy50aW1lciRcbiAgICAgIC5waXBlKFxuICAgICAgICB0YWtlVW50aWwodGhpcy50aW1lclN0b3AkKSxcbiAgICAgICAgdGFrZVVudGlsKHRoaXMuZGVzdHJveSQpLFxuICAgICAgICBmaWx0ZXIoKCkgPT4gdGhpcy5pc1Zpc2libGUoKSlcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLmxpc3RLZXlNYW5hZ2VyLndpdGhXcmFwKHRydWUpLnNldE5leHRJdGVtQWN0aXZlKCk7XG4gICAgICAgIHRoaXMubGlzdEtleU1hbmFnZXIud2l0aFdyYXAodGhpcy5sb29wKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBzdG9wVGltZXIoKTogdm9pZCB7XG4gICAgdGhpcy50aW1lclN0b3AkLm5leHQoKTtcbiAgfVxufVxuIiwiLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2VcclxudGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGVcclxuTGljZW5zZSBhdCBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuXHJcblRISVMgQ09ERSBJUyBQUk9WSURFRCBPTiBBTiAqQVMgSVMqIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTllcclxuS0lORCwgRUlUSEVSIEVYUFJFU1MgT1IgSU1QTElFRCwgSU5DTFVESU5HIFdJVEhPVVQgTElNSVRBVElPTiBBTlkgSU1QTElFRFxyXG5XQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgVElUTEUsIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLFxyXG5NRVJDSEFOVEFCTElUWSBPUiBOT04tSU5GUklOR0VNRU5ULlxyXG5cclxuU2VlIHRoZSBBcGFjaGUgVmVyc2lvbiAyLjAgTGljZW5zZSBmb3Igc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zXHJcbmFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIGlmIChlLmluZGV4T2YocFtpXSkgPCAwKVxyXG4gICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIGV4cG9ydHMpIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKCFleHBvcnRzLmhhc093blByb3BlcnR5KHApKSBleHBvcnRzW3BdID0gbVtwXTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXSwgaSA9IDA7XHJcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaWYgKGdbbl0pIGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBuID09PSBcInJldHVyblwiIH0gOiBmID8gZih2KSA6IHY7IH0gOiBmOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdLCBpO1xyXG4gICAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgZCwgdikgeyBQcm9taXNlLnJlc29sdmUodikudGhlbihmdW5jdGlvbih2KSB7IHJlc29sdmUoeyB2YWx1ZTogdiwgZG9uZTogZCB9KTsgfSwgcmVqZWN0KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tYWtlVGVtcGxhdGVPYmplY3QoY29va2VkLCByYXcpIHtcclxuICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XHJcbiAgICByZXR1cm4gY29va2VkO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0U3Rhcihtb2QpIHtcclxuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XHJcbiAgICB2YXIgcmVzdWx0ID0ge307XHJcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgcmVzdWx0W2tdID0gbW9kW2tdO1xyXG4gICAgcmVzdWx0LmRlZmF1bHQgPSBtb2Q7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcclxufVxyXG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE1hdEJ1dHRvbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2J1dHRvbic7XG5pbXBvcnQgeyBNYXRJY29uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvaWNvbic7XG5cbmltcG9ydCB7IE1hdENhcm91c2VsQ29tcG9uZW50IH0gZnJvbSAnLi9jYXJvdXNlbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWF0Q2Fyb3VzZWxTbGlkZUNvbXBvbmVudCB9IGZyb20gJy4vY2Fyb3VzZWwtc2xpZGUvY2Fyb3VzZWwtc2xpZGUuY29tcG9uZW50JztcbmltcG9ydCB7XG4gIEhhbW1lckdlc3R1cmVDb25maWcsXG4gIEhBTU1FUl9HRVNUVVJFX0NPTkZJR1xufSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7IE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb21waWxlci9zcmMvY29yZSc7XG5cbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzEwNTQxI2lzc3VlY29tbWVudC0zMDA3NjEzODdcbmV4cG9ydCBjbGFzcyBNYXRDYXJvdXNlbEhhbW1lckNvbmZpZyBleHRlbmRzIEhhbW1lckdlc3R1cmVDb25maWcge1xuICBvdmVycmlkZXMgPSB7XG4gICAgcGluY2g6IHsgZW5hYmxlOiBmYWxzZSB9LFxuICAgIHJvdGF0ZTogeyBlbmFibGU6IGZhbHNlIH1cbiAgfTtcbn1cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW01hdENhcm91c2VsQ29tcG9uZW50LCBNYXRDYXJvdXNlbFNsaWRlQ29tcG9uZW50XSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgTWF0QnV0dG9uTW9kdWxlLCBNYXRJY29uTW9kdWxlXSxcbiAgZXhwb3J0czogW01hdENhcm91c2VsQ29tcG9uZW50LCBNYXRDYXJvdXNlbFNsaWRlQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBNYXRDYXJvdXNlbE1vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogTWF0Q2Fyb3VzZWxNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgeyBwcm92aWRlOiBIQU1NRVJfR0VTVFVSRV9DT05GSUcsIHVzZUNsYXNzOiBNYXRDYXJvdXNlbEhhbW1lckNvbmZpZyB9XG4gICAgICBdXG4gICAgfTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbIkNvbXBvbmVudCIsIkRvbVNhbml0aXplciIsIklucHV0IiwiVmlld0NoaWxkIiwiVGVtcGxhdGVSZWYiLCJFdmVudEVtaXR0ZXIiLCJTdWJqZWN0IiwiQmVoYXZpb3JTdWJqZWN0IiwiTGlzdEtleU1hbmFnZXIiLCJ0YWtlVW50aWwiLCJmaWx0ZXIiLCJpc1BsYXRmb3JtQnJvd3NlciIsImFuaW1hdGUiLCJzdHlsZSIsImludGVydmFsIiwiQW5pbWF0aW9uQnVpbGRlciIsIlJlbmRlcmVyMiIsIkluamVjdCIsIlBMQVRGT1JNX0lEIiwiT3V0cHV0IiwiQ29udGVudENoaWxkcmVuIiwiSG9zdExpc3RlbmVyIiwidHNsaWJfMS5fX2V4dGVuZHMiLCJIYW1tZXJHZXN0dXJlQ29uZmlnIiwiSEFNTUVSX0dFU1RVUkVfQ09ORklHIiwiTmdNb2R1bGUiLCJDb21tb25Nb2R1bGUiLCJNYXRCdXR0b25Nb2R1bGUiLCJNYXRJY29uTW9kdWxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQ0E7UUF5QkUsbUNBQW1CLFNBQXVCO1lBQXZCLGNBQVMsR0FBVCxTQUFTLENBQWM7WUFOMUIsaUJBQVksR0FBRyxXQUFXLENBQUM7WUFDM0IsZ0JBQVcsR0FBRyxLQUFLLENBQUM7WUFDcEIsYUFBUSxHQUFHLEtBQUssQ0FBQztTQUtoQzs7OztRQUVNLDRDQUFROzs7WUFBZjtnQkFDRSxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7b0JBQ2QsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLHdCQUF3QixDQUFDLFdBQVEsSUFBSSxDQUFDLEtBQUssUUFBSSxDQUFDLENBQUM7aUJBQzlFO2FBQ0Y7O29CQXJCRkEsY0FBUyxTQUFDO3dCQUNULFFBQVEsRUFBRSxvQkFBb0I7d0JBQzlCLG1WQUE4Qzs7cUJBRS9DOzs7Ozt3QkFSUUMsNEJBQVk7Ozs7NEJBV2xCQyxVQUFLO21DQUNMQSxVQUFLO2tDQUNMQSxVQUFLOytCQUNMQSxVQUFLO2tDQUVMQyxjQUFTLFNBQUNDLGdCQUFXOztRQVV4QixnQ0FBQztLQXRCRDs7Ozs7O0FDWkE7O1FBNEJFLE9BQUk7UUFDSixRQUFLO1FBQ0wsUUFBSzs7Ozs7QUFHUDtRQWdIRSw4QkFDVSxnQkFBa0MsRUFDbEMsUUFBbUIsRUFDRSxVQUFVO1lBRi9CLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7WUFDbEMsYUFBUSxHQUFSLFFBQVEsQ0FBVztZQUNFLGVBQVUsR0FBVixVQUFVLENBQUE7WUE1R3pCLFlBQU8sR0FBRyxlQUFlLENBQUM7WUF1QjFCLGVBQVUsR0FBRyxJQUFJLENBQUM7WUFDbEIsbUJBQWMsR0FBRyxJQUFJLENBQUM7WUFDdEIsVUFBSyxHQUFpQixRQUFRLENBQUM7WUFXL0Isd0JBQW1CLEdBQUcsSUFBSSxDQUFDO1lBQzNCLGVBQVUsR0FBRyxFQUFFLENBQUM7WUFDaEIsZ0JBQVcsR0FBRyxNQUFNLENBQUM7WUFPckIsZ0JBQVcsR0FBRyxLQUFLLENBQUM7WUFDcEIsa0JBQWEsR0FBRyxLQUFLLENBQUM7WUFZL0IsV0FBTSxHQUF5QixJQUFJQyxpQkFBWSxFQUFVLENBQUM7WUEwQnpELGNBQVMsR0FBRyxJQUFJLENBQUM7WUFDakIsY0FBUyxHQUFHLElBQUlDLFlBQU8sRUFBVyxDQUFDO1lBRW5DLGNBQVMsR0FBRyxJQUFJQyxvQkFBZSxDQUFTLElBQUksQ0FBQyxDQUFDO1lBQzlDLFlBQU8sR0FBRyxJQUFJQSxvQkFBZSxDQUFTLElBQUksQ0FBQyxDQUFDO1lBRTVDLGNBQVMsR0FBRyxNQUFNLENBQUM7WUFDbkIsY0FBUyxHQUFHLElBQUlELFlBQU8sRUFBUyxDQUFDO1lBRWpDLFVBQUssR0FBRyxJQUFJLENBQUM7WUFDYixVQUFLLEdBQUcsSUFBSUEsWUFBTyxFQUFXLENBQUM7WUFFL0IsaUJBQVksR0FBZ0IsS0FBSyxDQUFDO1lBQ2xDLGlCQUFZLEdBQUcsSUFBSUEsWUFBTyxFQUFlLENBQUM7WUFHMUMsZUFBVSxHQUFHLElBQUlBLFlBQU8sRUFBUyxDQUFDO1lBRWxDLGFBQVEsR0FBRyxJQUFJQSxZQUFPLEVBQVMsQ0FBQztZQUNoQyxZQUFPLEdBQUcsS0FBSyxDQUFDO1NBTXBCO1FBMUdKLHNCQUNXLDBDQUFROzs7O2dCQURuQixVQUNvQixLQUFjO2dCQUNoQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDM0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7YUFDeEI7OztXQUFBO1FBRUQsc0JBQ1csMENBQVE7Ozs7Z0JBRG5CLFVBQ29CLEtBQWE7Z0JBQy9CLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQzVCOzs7V0FBQTtRQUVELHNCQUFXLHNDQUFJOzs7Z0JBQWY7Z0JBQ0UsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO2FBQ25COzs7O2dCQUNELFVBQ2dCLEtBQWM7Z0JBQzVCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUN2QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQzthQUNwQjs7O1dBTEE7UUFXRCxzQkFBVywwQ0FBUTs7O2dCQUFuQjtnQkFDRSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7YUFDdkI7Ozs7Z0JBQ0QsVUFDb0IsS0FBYTtnQkFDL0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDdkI7OztXQUxBO1FBV0Qsc0JBQ1csd0NBQU07Ozs7Z0JBRGpCLFVBQ2tCLEtBQWE7Z0JBQzdCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQzFCOzs7V0FBQTtRQUtELHNCQUFXLDZDQUFXOzs7Z0JBQXRCO2dCQUNFLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQzthQUMxQjs7OztnQkFDRCxVQUN1QixLQUFrQjtnQkFDdkMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQzlCLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO2FBQzNCOzs7V0FMQTtRQVVELHNCQUFXLDhDQUFZOzs7Z0JBQXZCO2dCQUNFLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRTtvQkFDdkIsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLGVBQWUsQ0FBQztpQkFDNUM7Z0JBRUQsT0FBTyxDQUFDLENBQUM7YUFDVjs7O1dBQUE7UUFDRCxzQkFBVyw4Q0FBWTs7O2dCQUF2QjtnQkFDRSxJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUU7b0JBQ3ZCLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUM7aUJBQ3ZDO2dCQUVELE9BQU8sSUFBSSxDQUFDO2FBQ2I7OztXQUFBOzs7O1FBc0NNLGlEQUFrQjs7O1lBQXpCO2dCQUFBLGlCQVVDO2dCQVRDLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSUUsbUJBQWMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO3FCQUN0RCx1QkFBdUIsQ0FBQyxLQUFLLENBQUM7cUJBQzlCLHlCQUF5QixDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7cUJBQzVDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBRXhCLElBQUksQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hDLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTTtxQkFDdkIsSUFBSSxDQUFDQyxtQkFBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztxQkFDOUIsU0FBUyxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsYUFBYSxFQUFFLEdBQUEsQ0FBQyxDQUFDO2FBQzFDOzs7O1FBRU0sOENBQWU7OztZQUF0QjtnQkFBQSxpQkE4QkM7Z0JBN0JDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDQSxtQkFBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFBLEtBQUs7b0JBQzNELEtBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztvQkFDakIsS0FBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDeEIsQ0FBQyxDQUFDO2dCQUVILElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDQSxtQkFBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFBLEtBQUs7b0JBQzNELEtBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztvQkFDakIsS0FBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDdkIsS0FBSSxDQUFDLFVBQVUsQ0FBQyxLQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7aUJBQ2pDLENBQUMsQ0FBQztnQkFFSCxJQUFJLENBQUMsU0FBUztxQkFDWCxJQUFJLENBQUNBLG1CQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO3FCQUM5QixTQUFTLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUEsQ0FBQyxDQUFDO2dCQUVwQyxJQUFJLENBQUMsS0FBSztxQkFDUCxJQUFJLENBQUNBLG1CQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO3FCQUM5QixTQUFTLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBQSxDQUFDLENBQUM7Z0JBRTNELElBQUksQ0FBQyxZQUFZO3FCQUNkLElBQUksQ0FBQ0EsbUJBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7cUJBQzlCLFNBQVMsQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUksQ0FBQyxjQUFjLENBQUMseUJBQXlCLENBQUMsS0FBSyxDQUFDLEdBQUEsQ0FBQyxDQUFDO2dCQUU1RSxJQUFJLENBQUMsT0FBTztxQkFDVCxJQUFJLENBQ0hBLG1CQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUN4QkMsZ0JBQU0sQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssSUFBSSxLQUFLLEdBQUcsS0FBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUEsQ0FBQyxDQUN6RDtxQkFDQSxTQUFTLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxHQUFBLENBQUMsQ0FBQzthQUNoRDs7OztRQUVNLDBDQUFXOzs7WUFBbEI7Z0JBQ0UsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDckIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQzthQUMxQjs7OztRQUVNLG1DQUFJOzs7WUFBWDtnQkFDRSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUM1Qjs7OztRQUVNLHVDQUFROzs7WUFBZjtnQkFDRSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUMzQjs7Ozs7UUFFTSxzQ0FBTzs7OztZQUFkLFVBQWUsS0FBYTtnQkFDMUIsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQ25DOzs7OztRQUdNLHNDQUFPOzs7O1lBRGQsVUFDZSxLQUFvQjtnQkFDakMsSUFBSSxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtvQkFDckMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ3RDO2FBQ0Y7Ozs7UUFHTSwyQ0FBWTs7O1lBRG5CO2dCQUVFLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQzthQUNsQjs7OztRQUdNLDJDQUFZOzs7WUFEbkI7Z0JBRUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDakM7Ozs7O1FBR00sMkNBQVk7Ozs7WUFEbkIsVUFDb0IsS0FBc0I7Z0JBQ3hDLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtvQkFDdEIsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDOzs7d0JBQ2pCLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUM7b0JBRXJDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTt3QkFDVCxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7cUJBQ2I7eUJBQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO3dCQUNoQixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7cUJBQ2pCO2lCQUNGO2FBQ0Y7Ozs7O1FBR00sdUNBQVE7Ozs7WUFEZixVQUNnQixLQUFZOzs7Z0JBRzFCLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDakI7Ozs7OztRQUVNLG9DQUFLOzs7OztZQUFaLFVBQWEsS0FBVSxFQUFFLFNBQXNCOzs7Z0JBRzdDLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEVBQUU7b0JBQ3pELE9BQU87aUJBQ1I7O29CQUNHLEVBQUUsR0FBRyxLQUFLLENBQUMsTUFBTTtnQkFDckIsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFLEVBQUU7b0JBQ3hCLEVBQUUsSUFBSSxHQUFHLENBQUM7aUJBQ1g7Z0JBRUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQztnQkFDeEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQ3BCLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxFQUMvQixXQUFXLEVBQ1gsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQzNDLENBQUM7YUFDSDs7Ozs7O1FBRU0sdUNBQVE7Ozs7O1lBQWYsVUFBZ0IsS0FBVSxFQUFFLFNBQXNCO2dCQUNoRCxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7Z0JBRS9DLElBQ0UsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFO29CQUNyQixJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsSUFBSSxFQUMvQztvQkFDQSxJQUFJLEtBQUssQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO3dCQUNyQixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7d0JBQ1osT0FBTztxQkFDUjtvQkFDRCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7b0JBQ2hCLE9BQU87aUJBQ1I7Z0JBQ0QsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO2FBQ3RCOzs7OztRQUVPLDRDQUFhOzs7O1lBQXJCOztvQkFDUSxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsS0FBSyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQzs7b0JBQzFDLElBQUksR0FDUixJQUFJO3FCQUNILElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLHFCQUFxQixFQUFFLENBQUMsSUFBSTt3QkFDM0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLHFCQUFxQixFQUFFOzZCQUNqRSxJQUFJLENBQUM7O29CQUNOLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDOztvQkFDdEMsS0FBSyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLFNBQVM7Z0JBRTFDLFFBQ0UsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLGVBQWUsS0FBSyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUM7cUJBQ3RELElBQUksQ0FBQyxjQUFjLENBQUMsZUFBZSxLQUFLLFNBQVMsSUFBSSxJQUFJLElBQUksS0FBSyxDQUFDLEVBQ3BFO2FBQ0g7Ozs7O1FBRU8sd0NBQVM7Ozs7WUFBakI7Z0JBQ0UsSUFBSSxDQUFDQyx3QkFBaUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7b0JBQ3ZDLE9BQU8sS0FBSyxDQUFDO2lCQUNkOztvQkFFSyxJQUFJLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGFBQWE7O29CQUMzQyxVQUFVLEdBQUcsTUFBTSxDQUFDLFdBQVc7O29CQUMvQixhQUFhLEdBQUcsVUFBVSxHQUFHLE1BQU0sQ0FBQyxXQUFXOztvQkFDL0MsVUFBVSxHQUFHLElBQUksQ0FBQyxxQkFBcUIsRUFBRTs7b0JBQ3pDLE9BQU8sR0FBRyxVQUFVLEdBQUcsVUFBVSxDQUFDLEdBQUc7O29CQUNyQyxVQUFVLEdBQUcsT0FBTyxHQUFHLFVBQVUsQ0FBQyxNQUFNO2dCQUU5QyxPQUFPLFVBQVUsSUFBSSxhQUFhLElBQUksT0FBTyxJQUFJLFVBQVUsQ0FBQzthQUM3RDs7Ozs7UUFFTyx3Q0FBUzs7OztZQUFqQjs7b0JBQ1EsTUFBTSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUU7O29CQUM5RCxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsS0FBSyxLQUFLLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDaEQsT0FBTyxJQUFJLEdBQUcsTUFBTSxDQUFDO2FBQ3RCOzs7Ozs7UUFFTyw2Q0FBYzs7Ozs7WUFBdEIsVUFBdUIsTUFBYztnQkFDbkMsT0FBTyxnQkFBYyxNQUFNLFFBQUssQ0FBQzthQUNsQzs7Ozs7UUFFTyx1Q0FBUTs7OztZQUFoQjtnQkFDRSxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDO2FBQ3pEOzs7Ozs7O1FBRU8sbUNBQUk7Ozs7OztZQUFaLFVBQWEsU0FBb0IsRUFBRSxLQUFjO2dCQUMvQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTs7d0JBQ1gsR0FBRyxHQUFHLElBQUksQ0FBQyxXQUFXLEtBQUssS0FBSztvQkFFdEMsUUFBUSxTQUFTO3dCQUNmLEtBQUssU0FBUyxDQUFDLElBQUk7NEJBQ2pCLE9BQU8sR0FBRztrQ0FDTixJQUFJLENBQUMsY0FBYyxDQUFDLGlCQUFpQixFQUFFO2tDQUN2QyxJQUFJLENBQUMsY0FBYyxDQUFDLHFCQUFxQixFQUFFLENBQUM7d0JBQ2xELEtBQUssU0FBUyxDQUFDLEtBQUs7NEJBQ2xCLE9BQU8sR0FBRztrQ0FDTixJQUFJLENBQUMsY0FBYyxDQUFDLHFCQUFxQixFQUFFO2tDQUMzQyxJQUFJLENBQUMsY0FBYyxDQUFDLGlCQUFpQixFQUFFLENBQUM7d0JBQzlDLEtBQUssU0FBUyxDQUFDLEtBQUs7NEJBQ2xCLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7cUJBQ25EO2lCQUNGO2FBQ0Y7Ozs7O1FBRU8sNENBQWE7Ozs7WUFBckI7Z0JBQUEsaUJBbUJDOztvQkFsQk8sV0FBVyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDOztvQkFDbkQsT0FBTyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQ3pDQyxrQkFBTyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUVDLGdCQUFLLENBQUMsRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUN6RDs7b0JBQ0ssU0FBUyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUM7Z0JBRWpFLFNBQVMsQ0FBQyxPQUFPLENBQUMsY0FBTSxRQUFDLEtBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxJQUFDLENBQUMsQ0FBQztnQkFDL0MsU0FBUyxDQUFDLE1BQU0sQ0FBQztvQkFDZixLQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7b0JBQ3BDLEtBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO29CQUNyQixLQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FDcEIsS0FBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLEVBQy9CLFdBQVcsRUFDWCxXQUFXLENBQ1osQ0FBQztvQkFDRixTQUFTLENBQUMsT0FBTyxFQUFFLENBQUM7aUJBQ3JCLENBQUMsQ0FBQztnQkFDSCxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDbEI7Ozs7OztRQUVPLDBDQUFXOzs7OztZQUFuQixVQUFvQixNQUFjO2dCQUNoQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQzthQUNuRTs7Ozs7O1FBRU8seUNBQVU7Ozs7O1lBQWxCLFVBQW1CLEtBQWE7Z0JBQzlCLElBQUksQ0FBQyxNQUFNLEdBQUdDLGFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUMvQjs7Ozs7O1FBRU8seUNBQVU7Ozs7O1lBQWxCLFVBQW1CLFFBQWlCO2dCQUFwQyxpQkFlQztnQkFkQyxJQUFJLENBQUMsUUFBUSxFQUFFO29CQUNiLE9BQU87aUJBQ1I7Z0JBRUQsSUFBSSxDQUFDLE1BQU07cUJBQ1IsSUFBSSxDQUNITCxtQkFBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFDMUJBLG1CQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUN4QkMsZ0JBQU0sQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLFNBQVMsRUFBRSxHQUFBLENBQUMsQ0FDL0I7cUJBQ0EsU0FBUyxDQUFDO29CQUNULEtBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLGlCQUFpQixFQUFFLENBQUM7b0JBQ3ZELEtBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLEtBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDekMsQ0FBQyxDQUFDO2FBQ047Ozs7O1FBRU8sd0NBQVM7Ozs7WUFBakI7Z0JBQ0UsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUN4Qjs7b0JBN1dGVixjQUFTLFNBQUM7d0JBQ1QsUUFBUSxFQUFFLGNBQWM7d0JBQ3hCLHE2RUFBd0M7O3FCQUV6Qzs7Ozs7d0JBckN3QmUsMkJBQWdCO3dCQWlCdkNDLGNBQVM7d0RBbUlOQyxXQUFNLFNBQUNDLGdCQUFXOzs7OzhCQTVHcEJoQixVQUFLO3VDQUNMQSxVQUFLOytCQUVMQSxVQUFLOytCQU1MQSxVQUFLOzJCQVFMQSxVQUFLO2lDQU1MQSxVQUFLO3FDQUNMQSxVQUFLOzRCQUNMQSxVQUFLOytCQUtMQSxVQUFLOzBDQU1MQSxVQUFLO2lDQUNMQSxVQUFLO2tDQUNMQSxVQUFLOzZCQUVMQSxVQUFLO2tDQUtMQSxVQUFLO29DQUNMQSxVQUFLO2tDQUtMQSxVQUFLOzZCQU1MaUIsV0FBTTtpQ0FrQk5DLG9CQUFlLFNBQUMseUJBQXlCO3dDQUd6Q2pCLGNBQVMsU0FBQyxtQkFBbUI7bUNBRzdCQSxjQUFTLFNBQUMsY0FBYzs4QkEyRnhCa0IsaUJBQVksU0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUM7bUNBT2hDQSxpQkFBWSxTQUFDLFlBQVk7bUNBS3pCQSxpQkFBWSxTQUFDLFlBQVk7bUNBS3pCQSxpQkFBWSxTQUFDLFlBQVksRUFBRSxDQUFDLFFBQVEsQ0FBQzsrQkFjckNBLGlCQUFZLFNBQUMsZUFBZSxFQUFFLENBQUMsUUFBUSxDQUFDOztRQTRKM0MsMkJBQUM7S0E5V0Q7O0lDakNBOzs7Ozs7Ozs7Ozs7OztJQWNBO0lBRUEsSUFBSSxhQUFhLEdBQUcsVUFBUyxDQUFDLEVBQUUsQ0FBQztRQUM3QixhQUFhLEdBQUcsTUFBTSxDQUFDLGNBQWM7YUFDaEMsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLFlBQVksS0FBSyxJQUFJLFVBQVUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDNUUsVUFBVSxDQUFDLEVBQUUsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQztnQkFBRSxJQUFJLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO29CQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQy9FLE9BQU8sYUFBYSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUMvQixDQUFDLENBQUM7QUFFRixhQUFnQixTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDMUIsYUFBYSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNwQixTQUFTLEVBQUUsS0FBSyxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxFQUFFO1FBQ3ZDLENBQUMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxLQUFLLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDekYsQ0FBQzs7Ozs7OztBQ2JEOzs7UUFBNkNDLDJDQUFtQjtRQUFoRTtZQUFBLHFFQUtDO1lBSkMsZUFBUyxHQUFHO2dCQUNWLEtBQUssRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7Z0JBQ3hCLE1BQU0sRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7YUFDMUIsQ0FBQzs7U0FDSDtRQUFELDhCQUFDO0lBQUQsQ0FMQSxDQUE2Q0MsbUNBQW1CLEdBSy9EOztRQUNEO1NBY0M7Ozs7UUFSUSx5QkFBTzs7O1lBQWQ7Z0JBQ0UsT0FBTztvQkFDTCxRQUFRLEVBQUUsaUJBQWlCO29CQUMzQixTQUFTLEVBQUU7d0JBQ1QsRUFBRSxPQUFPLEVBQUVDLHFDQUFxQixFQUFFLFFBQVEsRUFBRSx1QkFBdUIsRUFBRTtxQkFDdEU7aUJBQ0YsQ0FBQzthQUNIOztvQkFiRkMsYUFBUSxTQUFDO3dCQUNSLFlBQVksRUFBRSxDQUFDLG9CQUFvQixFQUFFLHlCQUF5QixDQUFDO3dCQUMvRCxPQUFPLEVBQUUsQ0FBQ0MsbUJBQVksRUFBRUMsc0JBQWUsRUFBRUMsa0JBQWEsQ0FBQzt3QkFDdkQsT0FBTyxFQUFFLENBQUMsb0JBQW9CLEVBQUUseUJBQXlCLENBQUM7cUJBQzNEOztRQVVELHdCQUFDO0tBZEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7In0=
import { HammerGestureConfig } from '@angular/platform-browser';
import { ModuleWithProviders } from '@angular/compiler/src/core';
export declare class MatCarouselHammerConfig extends HammerGestureConfig {
    overrides: {
        pinch: {
            enable: boolean;
        };
        rotate: {
            enable: boolean;
        };
    };
}
export declare class MatCarouselModule {
    static forRoot(): ModuleWithProviders;
}

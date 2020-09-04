import { ListKeyManagerOption } from '@angular/cdk/a11y';
import { OnInit, TemplateRef } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { MatCarouselSlide } from './carousel-slide';
export declare class MatCarouselSlideComponent implements ListKeyManagerOption, MatCarouselSlide, OnInit {
    sanitizer: DomSanitizer;
    image: SafeStyle;
    overlayColor: string;
    hideOverlay: boolean;
    disabled: boolean;
    templateRef: TemplateRef<any>;
    constructor(sanitizer: DomSanitizer);
    ngOnInit(): void;
}

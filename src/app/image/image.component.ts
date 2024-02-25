import { Component, computed } from '@angular/core';
import { ModelService } from '../state/model.service';
import { DomSanitizer } from '@angular/platform-browser';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-image',
  standalone: true,
  imports: [NgIf],
  templateUrl: './image.component.html',
  styleUrl: './image.component.scss',
})
export class ImageComponent {
  selectedModelCode = this.modelState.modelCode;
  selectedColorCode = this.modelState.colorCode;
  showImage = computed(
    () => this.selectedModelCode() && this.selectedColorCode(),
  );
  imageSource = computed(() =>
    this.showImage()
      ? `https://interstate21.com/tesla-app/images/${this.selectedModelCode()}/${this.selectedColorCode()}.jpg`
      : '',
  );

  safeImageSource() {
    return this.sanitizer.bypassSecurityTrustUrl(this.imageSource());
  }

  constructor(
    private modelState: ModelService,
    private sanitizer: DomSanitizer,
  ) { }
}

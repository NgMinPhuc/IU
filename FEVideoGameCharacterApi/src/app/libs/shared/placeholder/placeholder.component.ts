import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
  selector: 'app-placeholder',
  standalone: true,
  template: `
    <div class="flex flex-col items-center justify-center h-64 text-center">
      <i class="pi pi-wrench text-5xl text-gray-300 mb-4"></i>
      <h2 class="text-xl font-semibold text-gray-500">{{ title() }}</h2>
      <p class="text-sm text-gray-400 mt-1">This section is coming soon.</p>
    </div>
  `,
})
export class PlaceholderComponent {
  private route = inject(ActivatedRoute);
  title = toSignal(this.route.data.pipe(map((d) => d['title'] ?? 'Page')), {
    initialValue: 'Page',
  });
}

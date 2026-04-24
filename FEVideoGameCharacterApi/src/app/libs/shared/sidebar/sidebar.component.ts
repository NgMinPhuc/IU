import { Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  collapsed = input(false);

  readonly navItems: NavItem[] = [
    { label: 'Dashboard', icon: 'pi-home', route: '/dashboard' },
    { label: 'Characters', icon: 'pi-users', route: '/characters' },
    { label: 'Games', icon: 'pi-th-large', route: '/games' },
    { label: 'Settings', icon: 'pi-cog', route: '/settings' },
  ];
}

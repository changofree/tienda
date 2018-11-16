import { NgModule, Component } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { HomewebComponent } from './frontend/homeweb/homeweb.component';
import { DetalleComponent } from './frontend/homeweb/detalle/detalle.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrdenComponent } from './orden/orden.component';
import { ValidacionComponent } from './validacion/validacion.component';
import { DreamTemplateComponent } from './frontend/dream-template/dream-template.component';
import { TodosProductosComponent } from './frontend/homeweb/todos-productos/todos-productos.component';
const routes: Routes =[
  {
    path: 'validacion',
    component: ValidacionComponent
  }, 
  {
    path: 'orden/:status',
    component: OrdenComponent
  },
  {
    path: 'dream',
    component: DreamTemplateComponent
  },
  {
    path: ':key',
    component: HomewebComponent
  },
  {
    path: 'productos/:key',
    component: TodosProductosComponent
  },
  {
    path: 'detalle/:key/:producto',
    component: DetalleComponent
  },
  {
    path: 'checkout/:key',
    component: CheckoutComponent
  },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
        {
      path: '',
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
  }]}
    // { path: 'dashboard',      component: DashboardComponent },
    // { path: 'user-profile',   component: UserProfileComponent },
    // { path: 'table-list',     component: TableListComponent },
    // { path: 'typography',     component: TypographyComponent },
    // { path: 'icons',          component: IconsComponent },
    // { path: 'maps',           component: MapsComponent },
    // { path: 'notifications',  component: NotificationsComponent },
    // { path: 'upgrade',        component: UpgradeComponent },
    // { path: '',               redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }

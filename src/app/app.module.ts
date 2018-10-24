import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';


import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TableListComponent } from './table-list/table-list.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

// FireBase Configuration

import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { StoreProductComponent } from './store-product/store-product.component';
import {MatSelectModule} from '@angular/material/select';
import { ProductoService } from './services/producto.service';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { MatInputModule, MatFormFieldModule, MatButtonModule, MatToolbarModule, MatIconModule, MatMenuModule, MatProgressSpinnerModule, MatCardModule } from '@angular/material';
import { EditProductComponent } from './edit-product/edit-product.component';
import { AnunciosService } from './anuncios.service';
import { HomewebComponent } from './homeweb/homeweb.component';
import { DashboardService } from './dashboard.service';
import { DetalleComponent } from './homeweb/detalle/detalle.component';
import { PedidoService } from './services/pedido.service';
import { CarritoComponent } from './carrito/carrito.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { NavbarHomeComponent } from './homeweb/navbar-home/navbar-home.component';
import { FooterwebComponent } from './homeweb/footerweb/footerweb.component';
import { OrdenComponent } from './orden/orden.component';
import { ListadopedidosComponent } from './listadopedidos/listadopedidos.component';
import { ListadoventasComponent } from './listadoventas/listadoventas.component';


@NgModule({
  imports: [
    MatCardModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatSortModule,
    FormsModule,
    HttpModule,
    MatTableModule,
    ComponentsModule,
    RouterModule,
    MatSelectModule,
    AppRoutingModule,
    MatSnackBarModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase),
  
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    HomewebComponent,
    DetalleComponent,
    CarritoComponent,
    CheckoutComponent,
    NavbarHomeComponent,
    FooterwebComponent,
    OrdenComponent,
  ],
  providers: [AnunciosService, ProductoService, DashboardService, PedidoService],
  bootstrap: [AppComponent]
})
export class AppModule { }

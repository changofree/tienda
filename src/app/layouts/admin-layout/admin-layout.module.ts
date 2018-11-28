import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatTooltipModule,
} from '@angular/material';
import { StoreProductComponent } from '../../store-product/store-product.component';
import { TableCategoriaComponent } from '../../table-categoria/table-categoria.component';
import {MatTableModule} from '@angular/material/table';
import { EditProductComponent } from '../../edit-product/edit-product.component';
import { AnunciosComponent } from '../../anuncios/anuncios.component';
import { ListadopedidosComponent } from 'app/listadopedidos/listadopedidos.component';
import { ListadoventasComponent } from 'app/listadoventas/listadoventas.component';
import { SoporteComponent } from 'app/soporte/soporte.component';
import { PlantillaComponent } from 'app/plantilla/plantilla.component';
import { ChangeLinePipe } from 'app/change-line.pipe';
import { ChangeLineDPipe } from 'app/change-line-d.pipe';
import { PersonalizarComponent } from 'app/personalizar/personalizar.component';
import { LogoComponent } from 'app/logo/logo.component';
import { BannersComponent } from 'app/banners/banners.component';
import { PixelfbComponent } from 'app/pixelfb/pixelfb.component';
import { AnuncioComponent } from 'app/anuncio/anuncio.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    MatButtonModule,
    MatRippleModule,
    MatInputModule,
    MatTooltipModule,
    MatTableModule,
  ],
  declarations: [
    DashboardComponent,
    AnunciosComponent,
    EditProductComponent,
    UserProfileComponent,
    TableListComponent,
    PlantillaComponent,
    TypographyComponent,
    IconsComponent,
    LogoComponent,
    BannersComponent,
    TableCategoriaComponent,
    MapsComponent,
    SoporteComponent,
    ListadopedidosComponent,
    NotificationsComponent,
    UpgradeComponent,
    StoreProductComponent,
    ListadoventasComponent,
    ChangeLineDPipe,
    PersonalizarComponent,
    PixelfbComponent,
    AnuncioComponent
  ],
})

export class AdminLayoutModule {}

import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { StoreProductComponent } from '../../store-product/store-product.component';
import { TableCategoriaComponent } from '../../table-categoria/table-categoria.component';
import { EditProductComponent } from '../../edit-product/edit-product.component';
import { AnunciosComponent } from '../../anuncios/anuncios.component';
import { ListadopedidosComponent } from 'app/listadopedidos/listadopedidos.component';
import { ListadoventasComponent } from 'app/listadoventas/listadoventas.component';
import { SoporteComponent } from 'app/soporte/soporte.component';
import { PlantillaComponent } from 'app/plantilla/plantilla.component';
import { PersonalizarComponent } from 'app/personalizar/personalizar.component';

export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade', 
    //         component: UpgradeComponent
    //     }]
    // }
    { path: 'backend/panel',      component: DashboardComponent },
    { path: 'backend/configuracion',   component: UserProfileComponent },
    { path: 'backend/listado-productos',     component: TableListComponent },
    { path: 'backend/listado-categorias', component:TableCategoriaComponent},
    { path: 'backend/typography',     component: TypographyComponent },
    { path: 'backend/icons',          component: IconsComponent },
    { path: 'backend/maps',           component: MapsComponent },
    { path: 'backend/inicio',  component: NotificationsComponent },
    { path: 'backend/upgrade',        component: UpgradeComponent },
    { path: 'backend/plantillas',        component: PlantillaComponent },
    { path: 'backend/personalizar',        component: PersonalizarComponent },
    { path: 'backend/listado-productos/agregar',        component: StoreProductComponent },
    { path: 'backend/listado-productos/editar/:key', component: EditProductComponent},
    { path: 'backend/listado-pedidos', component: ListadopedidosComponent},
    { path: 'backend/listado-ventas', component: ListadoventasComponent},
    { path: 'backend/soporte', component: SoporteComponent},
    { path: 'backend/anuncios', component: AnunciosComponent }
];

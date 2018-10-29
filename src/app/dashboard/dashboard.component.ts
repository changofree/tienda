import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { PedidoService } from 'app/services/pedido.service';
import { ProductoService } from 'app/services/producto.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  cantPedido : number;
  totalAcumulado : number;
  listVentas  : any[];

  constructor(
    private pedidoService : PedidoService,
    private clientService : ProductoService
  ) { }

  //  Funciones para generar los Graficos.
  startAnimationForLineChart(chart){
      let seq: any, delays: any, durations: any;
      seq = 0;
      delays = 80;
      durations = 500;

      chart.on('draw', function(data) {
        if(data.type === 'line' || data.type === 'area') {
          data.element.animate({
            d: {
              begin: 600,
              dur: 700,
              from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
              to: data.path.clone().stringify(),
              easing: Chartist.Svg.Easing.easeOutQuint
            }
          });
        } else if(data.type === 'point') {
              seq++;
              data.element.animate({
                opacity: {
                  begin: seq * delays,
                  dur: durations,
                  from: 0,
                  to: 1,
                  easing: 'ease'
                }
              });
          }
      });

      seq = 0;
  };
  startAnimationForBarChart(chart){
      let seq2: any, delays2: any, durations2: any;

      seq2 = 0;
      delays2 = 80;
      durations2 = 500;
      chart.on('draw', function(data) {
        if(data.type === 'bar'){
            seq2++;
            data.element.animate({
              opacity: {
                begin: seq2 * delays2,
                dur: durations2,
                from: 0,
                to: 1,
                easing: 'ease'
              }
            });
        }
      });

      seq2 = 0;
  };
  ngOnInit() {
      /* ----------==========     Valores de los graficos.    ==========---------- */

      const dataDailySalesChart: any = {
          labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
          series: [
              [12, 17, 7, 17, 23, 18, 38]
          ]
      };

     const optionsDailySalesChart: any = {
          lineSmooth: Chartist.Interpolation.cardinal({
              tension: 0
          }),
          low: 0,
          high: 50, 
          chartPadding: { top: 0, right: 0, bottom: 0, left: 0},
      }

      var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

      this.startAnimationForLineChart(dailySalesChart);


      /* ----------==========   Movida extraña   ==========---------- */

      const dataCompletedTasksChart: any = {
          labels: ['12p', '3p', '6p', '9p', '12p', '3a', '6a', '9a'],
          series: [
              [230, 750, 450, 300, 280, 240, 200, 190]
          ]
      };

     const optionsCompletedTasksChart: any = {
          lineSmooth: Chartist.Interpolation.cardinal({
              tension: 0
          }),
          low: 0,
          high: 1000, 
          chartPadding: { top: 0, right: 0, bottom: 0, left: 0}
      }

      var completedTasksChart = new Chartist.Line('#completedTasksChart', dataCompletedTasksChart, optionsCompletedTasksChart);

      // Crea la animacion.
      this.startAnimationForLineChart(completedTasksChart);




      var datawebsiteViewsChart = {
        labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
        series: [
          [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]

        ]
      };
      var optionswebsiteViewsChart = {
          axisX: {
              showGrid: false
          },
          low: 0,
          high: 1000,
          chartPadding: { top: 0, right: 5, bottom: 0, left: 0}
      };
      var responsiveOptions: any[] = [
        ['screen and (max-width: 640px)', {
          seriesBarDistance: 5,
          axisX: {
            labelInterpolationFnc: function (value) {
              return value[0];
            }
          }
        }]
      ];
      var websiteViewsChart = new Chartist.Bar('#websiteViewsChart', datawebsiteViewsChart, optionswebsiteViewsChart, responsiveOptions);

      this.startAnimationForBarChart(websiteViewsChart);
      

      //  Codigo leible

      let email = localStorage.getItem("cliente-chango");
      let aux = [];
      let aux2 = [];

      //  Filtramos los clientes por el que esta online y lo guardamos en aux.
      this.clientService.getListClientsWithSnap()
      .snapshotChanges()
      .subscribe(data => {
        data.forEach(element => {
          let x = element.payload.toJSON();
          x["$key"] = element.key;
          if(email === x["email"]){
            aux.push(x);
          }
        });

        //  Tomamos todos los pedidos guardados en la key de nuestro cliente online.
        this.pedidoService.getPedidos(aux[0].$key)
        .snapshotChanges()
        .subscribe(data => {
          this.listVentas = []; //Va a guardar un resumen de ventas concretadas para mostrarlas en el html. status 2
          let aux3 = [];        //Usamos para filtrar el valor total de todas las ventas. status 2
          aux2 = [];            //Si el status del pedido es 1, se considera pedido para concretar y se guarda en CantPedido para informar el cliente de nuevos pedidos.

          data.forEach(element => {
            let y = element.payload.toJSON();
            y["$key"] = element.key;
            if(y["status"] === 1){
              aux2.push(y);
            }else{
              this.listVentas.push(y);
              aux3.push(y)
            }
          });

          this.cantPedido = aux2.length;  // Cantidad de pedidos
          if(this.cantPedido === undefined || this.cantPedido === 0){
            this.cantPedido = 0;  
          }

          let f = new Date();        
          let anoActual = (f.getFullYear()).toString();
          let mesActual = (f.getMonth()).toString();
          
          this.totalAcumulado = 0; // Dinero concretado
          aux3.forEach(element => { 
            let arrayImg = element.fechacreacion.split("/");
            console.log(arrayImg);
            if(arrayImg[1] === mesActual && arrayImg[2] === anoActual ){ 
              this.totalAcumulado = parseInt(element.total) + this.totalAcumulado;
            }
          });
        });
      });
    }








}

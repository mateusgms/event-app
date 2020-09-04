import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // Slider Images
  slides = [
    {'image': 'https://nacoesunidas.org/wp-content/uploads/2020/04/jerusalem-1712855_1280.jpg'},
    {'image': 'https://conteudo.imguol.com.br/c/bol/fotos/7a/2016/03/18/11-jerusalem-em-israel-1458339121913_300x200.jpg'},
    {'image': 'https://www.rcaturismo.com.br/getattachment/site/Conteudo/Internacional/Asia/Israel/israel.png'},
    {'image': 'https://conteudo.imguol.com.br/c/noticias/9b/2017/12/07/6dez2017---bandeira-de-israel-e-vista-perto-da-cupula-da-rocha-localizado-na-cidade-velha-de-jerusalem-1512639559847_v2_1920x1280.jpg'},
  ];
  constructor() { }

  ngOnInit(): void {
  }

}

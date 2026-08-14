import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  exibirMensagem = false;
  carroCorrendo = false;

  mostrarKchau(): void {
    this.exibirMensagem = true;

    
    const audio = new Audio('https://www.myinstants.com/media/sounds/kachow.mp3');
    audio.volume = 0.5;
    audio.play();

    
    this.dispararCarro();
  }

  dispararCarro(): void {
    if (this.carroCorrendo) return; 

    this.carroCorrendo = true;

    
    setTimeout(() => {
      this.carroCorrendo = false;
    }, 1200);
  }
}
export default class Ball {

    constructor(pEscenario, pBarra1, pBarra2) {
        this.barra1 = pBarra1;
        this.barra2 = pBarra2;
        this.escenario = pEscenario;
        this.velocidadMax = 10;

        //crear elemento

        this.div = document.createElement('div');
        this.div.classList.add('ball');
        this.escenario.appendChild(this.div);

        this.direccion = 1;
        this.state = 2;

        this.interval = setInterval(() => {
            this.moveBall();
        }, 30)

    }

    moveBall() {
        this.checkStateBall();
        this.getPoint();

        switch (this.state) {
            case 1: //derecha y abajo (diagonal)
                this.div.style.left = (this.div.offsetLeft + this.velocidadMax) + 'px';
                this.div.style.top = (this.div.offsetTop + this.velocidadMax) + 'px';
                break;

            case 2: //derecha y arriba
                this.div.style.left = (this.div.offsetLeft + this.velocidadMax) + 'px';
                this.div.style.top = (this.div.offsetTop - this.velocidadMax) + 'px';
                break;

            case 3: //izquierda y abajo
                this.div.style.left = (this.div.offsetLeft - this.velocidadMax) + 'px';
                this.div.style.top = (this.div.offsetTop + this.velocidadMax) + 'px';
                break;

            case 4: //izquierda y arriba
                this.div.style.left = (this.div.offsetLeft - this.velocidadMax) + 'px';
                this.div.style.top = (this.div.offsetTop - this.velocidadMax) + 'px';
                break;
        }
    }

    getPoint() {
        if (this.div.offsetLeft <= 0) {
            clearInterval(this.interval)
            this.escenario.style.backgroundColor = "tomato";
            alert('gana jugador 2')
        }

        else if (this.div.offsetLeft >= 800) {
            clearInterval(this.interval)
            this.escenario.style.backgroundColor = "tomato";
            alert('gana jugador 1')
        }
    }

    checkStateBall() {

        //colisiones con los pong

        if (this.colisionPong2()) {
            this.direccion = 2;
            if (this.state === 2) this.state = 4;
            if (this.state === 1) this.state = 3;
        }
        else if (this.colisionPong1()) {
            this.direccion = 1;
            if (this.state === 3) this.state = 1;
            if (this.state === 4) this.state = 2;
        }

        //golpeo con la parte de arriba y la de abajo del escenario
        if (this.direccion === 1) {
            if (this.div.offsetTop >= 600) this.state = 2;
            else if (this.div.offsetTop <= 0) this.state = 1;
        }
        else {
            if (this.div.offsetTop >= 600) this.state = 4;
            else if (this.div.offsetTop <= 0) this.state = 3;
        }
    }

    colisionPong2() {
        if (this.div.offsetLeft >= 770 - this.barra2.div.clientWidth && this.div.offsetTop >= this.barra2.div.offsetTop && this.div.offsetTop <= this.barra2.div.offsetTop + this.barra2.div.clientHeight) {
            return true;
        }
        return false;
    }

    colisionPong1() {
        if (this.div.offsetLeft <= 30 - this.barra1.div.clientWidth &&
            this.div.offsetTop >= this.barra1.div.offsetTop &&
            this.div.offsetTop <= this.barra1.div.offsetTop + this.barra1.div.clientHeight) {
            return true;
        }
        return false;

    }
}
class Nodo{
    private data: Producto;
    private next: any;

    constructor(data: Producto){
        this.data = data;
        this.next = null;
    }

    public get_data(){
        return this.data;
    }

    public set_next(next: Nodo){
        this.next = next;
    }

    public get_next(){
        return this.next;
    }

    public to_string(){
        return this.data +"";
    }

}

class List{
    private size: number;
    private tail: any;
    private head: any;


    constructor(){
        this.tail = null;
        this.head = null;
        this.size = 0;
    }

    public is_empty(){
        return this.tail == null && this.head == null;
    }

    public append(data: Producto){
        let nodo: Nodo = new Nodo(data);
        if(this.is_empty()){
            this.tail = nodo;
            this.head = nodo;
        }

        else{
            this.tail.set_next(nodo);
            this.tail = nodo;
        }
        this.size += 1;
    }

    public buscar(codigo: number){
        let productos: string = "";
        let current = this.head;
        let encontrado: boolean = false; 
        let contador = 0;
        colisionB = false;
        while(current != null && current != undefined){
            
            if(current.data.getCodigoNumerico() == codigo){
                productos = productos + current.data.to_string(); 
                encontrado = true;
                contador += 1;
            }
            current = current.next
        
        }
        
        if (contador > 1){
            colisionB = true;
        }

        if (encontrado == false){
            console.log("No se encontro el elemento");
        }else{
            return productos;
        }
        
    }

    public transversal(){
        let current = this.head;
        let result: string = "";
        while (current !== null){
            result += current.get_data().to_string();
            current = current.next;

            if (current !== null){
                result += "->"
                }
            }
        return result;
    }
}

class Producto {
    private codigo: string;
    private nombre: string;
    private precioCosto: number;
    private precioVenta: number;
    private codigoNumerico: number;

    constructor(codigo: string, nombre: string, precio_costo: number, precio_venta:number) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.precioCosto = precio_costo;
        this.precioVenta = precio_venta;
        this.codigoNumerico = 0
    }

    public setCodigo(codigo: string) {
        this.codigo = codigo;
    }

    public getCodigo() {
        return this.codigo;
    }

    public setNombre(nombre: string): void {
        this.nombre = nombre;
    }

    public getNombre(): string {
        return this.nombre;
    }
    public setPrecioCosto(precioCosto: number) {
        this.precioCosto = precioCosto;
    }

    public getPrecioCosto(): number {
        return this.precioCosto;
    }

    public setPrecioVenta(precioVenta:number): void{
        this.precioVenta = precioVenta;
    }

    public getPrecioVenta(): number{
        return this.precioVenta;
    }

    public to_string(){
        return " Codigo: " + this.codigo + " nombre: " + this.nombre + " precio costo: "+ this.precioCosto + " precio venta: " + this.precioVenta;
    }

    private obtenerCodigoNumerico():void{
        let codigoN = "";
        for (let i = 1; i < this.codigo.length; i++) {
            codigoN = codigoN + this.codigo[i]
        }

        this.codigoNumerico = parseInt(codigoN);
    }

    public getCodigoNumerico(): number{
        this.obtenerCodigoNumerico()
        return this.codigoNumerico;
    }
    
}

let colisionB: boolean;
class HashTable {
    private size: number;
    private data: List[];

    constructor(size: number) {
        this.data = new Array(size);
        this.size = size;
        for (let i = 0; i < this.data.length; i++) {
            let lista: List = new List();
            this.data[i] = lista;
        }
    }

    private hash(key: number): number {
        return key % this.size;
    }

    public insert(producto: Producto): void {

        let index: number = this.hash(producto.getCodigoNumerico());
        let lista = this.data[index];
        lista.append(producto);
    }

    public buscar(codigo:number) {
        let index: number = this.hash(codigo);
        let producto = this.data[index].buscar(codigo);

        return producto;
    }

    public colision(){

    }
//Mostrar tabla hash
    public show(): void {
        let data: string = "";
        for (const codigo of this.data) {
            data += codigo.transversal() + " \n"
        }
        console.log(data);
    }
}


// Insertar 10 productos
let tablaProducto: HashTable = new HashTable(12);
let producto1: Producto = new Producto("P001","Kampilovan",60,75);
let producto2: Producto = new Producto("P002","Ibuprofeno",10,20);
let producto3: Producto = new Producto("P003","Panadol",5,15);
let producto4: Producto = new Producto("P004","Winasorb",40,70);
let producto5: Producto = new Producto("P005","Hidro vidan",30,45);
let producto6: Producto = new Producto("P001","prod colision",15,40);
let producto7: Producto = new Producto("P007","Enantyum ",15,40);
let producto8: Producto = new Producto("P008","Glicerin",15,40);
let producto9: Producto = new Producto("P009","Glucerna",2,10);
let producto10: Producto = new Producto("P010","Tempe",60,100);

tablaProducto.insert(producto1);
tablaProducto.insert(producto2);
tablaProducto.insert(producto3);
tablaProducto.insert(producto4);
tablaProducto.insert(producto5);
tablaProducto.insert(producto6);
tablaProducto.insert(producto7);
tablaProducto.insert(producto8);
tablaProducto.insert(producto9);
tablaProducto.insert(producto10);

//Provocando colision
let codigoABuscar: number = 1;
let producto = tablaProducto.buscar(codigoABuscar);
let colision = tablaProducto.colision();
console.log("El producto " + producto + " está en la tabla hash");
console.log("Tabla Hash: ");
tablaProducto.show();


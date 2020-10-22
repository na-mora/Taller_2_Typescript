
export class Student
{
    cedula: string;
    edad: number;
    direccion: string;
    telefono:string;

    constructor(pCedula: string, pEdad: number, pDireccion: string, pTelefono: string)
    {
        this.cedula = pCedula;
        this.edad = pEdad;
        this.direccion = pDireccion;
        this.telefono = pTelefono;
    }
    
}
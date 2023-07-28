const sql = require('mssql');
export class Competencia {
    private static clasificatorias:{estado:boolean} = {estado:false};
  
    private constructor() {}
  
    public static getEstadoClasificatorias() {
      return this.clasificatorias;
    }
  
    public static setEstadoClasificatorias() {
      this.clasificatorias.estado = true;
    }
  }
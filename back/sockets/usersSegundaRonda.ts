export class UserSegundaRonda {
  private static userList: { id: string; name: string; texto_1:string; clasificacion:number; estado:boolean }[] = [];

  private constructor() {}

  public static getUserList() {
    return this.userList;
  }

  public static addUser(user: any) {
    const added = this.userList.find((currentUser) => currentUser.id == user.id);
    if (added) {
      return;
    }
    this.userList.push(user);
    
  }

  public static removeUser(id: any) {
    if (this.userList) {
      this.userList = this.userList.filter((user) => user.id != id);
    }
  }
  public static setEstado(user:any, estado:boolean){
    this.userList.forEach(el =>{
      if(el.id == user)
        el.estado = estado;
    })
  }
  public static setTexto(user:any, texto:any){
    this.userList.forEach(el =>{
      if(el.id == user)
        el.texto_1 = texto;
    })
  }
}
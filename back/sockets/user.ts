export class User {
    private static userList: { id: string; name: string; integral:number }[] = [];
  
    private constructor() {}
  
    public static getUserList() {
      return this.userList;
    }
    public static setIntegral(user:any, integral:any){
      this.userList.forEach(el =>{
        if(el.id == user)
          el.integral = integral;
      })
      console.log(this.userList.find((currentUser) => currentUser.id == user));
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
  }
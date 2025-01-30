interface User{
    id:number;
    name: string;
    age: string;
    email: string;
    password: string;
}

type UpdateProps = Pick<User, 'name'|'age'|'email'>

function updateUser(UpdateProps:UpdateProps){
    console.log(UpdateProps)
}


/* Generics */
function getFirstElement<T>(arr: T[]) {
    return arr[0];
}

const el = getFirstElement(["harkiratSingh", "ramanSingh"]);
console.log(el.toLowerCase())
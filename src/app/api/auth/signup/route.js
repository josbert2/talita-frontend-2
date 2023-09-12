import { NextResponse } from "next/server";
import { hash } from "bcrypt";


export async function POST(request) {
    
    const { fullname, email, password, login } = await request.json(); 



    const hashedPassword = await hash(password, 10);
    if (!password || password.length < 1){
        return NextResponse.json({ message: "Password must be at least 6 characters", status: 400 });
    }

    




    const findUser = await fetch(`http://localhost:3001/api/user?email=${email}&fullname=${fullname}&hashedPassword=${hashedPassword}&login=${login}`);
    const user = await findUser.json();

    if (user.message === "User already exists"){
        return NextResponse.json({ message: "User already exists", status: 400 });
    }

    return NextResponse.json({ message: email });


    /*const createUser = await fetch(`http://localhost:3001/api/user?email=${email}`, {
        method: "GET",
    });



    const newUser = await createUser.json();
    
    if (newUser.message){
        return NextResponse.json({ message: newUser.message, status: 400 });
    }

    
  
    return NextResponse.json({ message: "Hello World" }); */
}
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//import Cookies from 'js-cookie';



const initialState = {
    user: [],
    accesstoken:"",
    refreshtoken:"",
    error:""
}

export const signUpUser = createAsyncThunk('signupuser',async(body)=>{
    const res = await fetch('http://127.0.0.1:8000/user/registration/',{
        method:'post',
        headers:{
            'Content-Type':"application/json",

        },
        body: JSON.stringify(body)
    })
    
    return await res.json();
})


// //Login

export const signInUser = createAsyncThunk('signinuser',async(body)=>{
    const res = await fetch('http://127.0.0.1:8000/user/login/',{
        method:'post',
        headers:{
            'Content-Type':"application/json",

        },
        body: JSON.stringify(body)
    })
    
    return await res.json();
})

//Logout

export const logoutUser = createAsyncThunk('logoutuser', async (body) => {
    const res = await fetch('http://127.0.0.1:8000/user/logout/', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        // Include any additional headers if needed
      },
      body: JSON.stringify(body),
    });
  
    return await res.json();
  });
  

// forgot password
export const forgotPassword = createAsyncThunk('forgotpassword', async (body) => {
    const res = await fetch('http://127.0.0.1:8000/user/password/reset/', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        // Include any additional headers if needed
      },
      body: JSON.stringify(body),
    });
  
    return await res.json();
  });



const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{

        addToken: (state, action)=>{
             state.token = localStorage.getItem("token")
            // state.token = token;
            //localStorage.setItem('token', state.payload.token);
            //Cookies.set('token', action.payload.token, { expires: 7 });
        },
        addUser: (state, action)=>{
            state.user = localStorage.getItem("user")
           // state.user = user;
        },
        logout: (state, action)=>{
            state.accesstoken = "";
            state.refreshtoken = "";
            state.user = [];
            localStorage.clear();
            //Cookies.remove('token');
        } 

    },
    extraReducers: (builder)=>{
        builder 
        //Login
        .addCase(signInUser.pending,(state,action)=>{
            state.loading = true
        })
        //{payload:{error,msg,token,resource_owner}}
        .addCase(signInUser.fulfilled,(state,action)=>{
            state.loading = false
            if(action.payload.user){
                
                state.user = action.payload.user;
                state.accesstoken = action.payload.access
                state.refreshtoken = action.payload.refresh
                state.error = []
                localStorage.setItem("user", JSON.stringify(action.payload.user))
                localStorage.setItem("accesstoken", JSON.stringify(action.payload.access))
                localStorage.setItem("refreshtoken", JSON.stringify(action.payload.refresh))
            }
            else{
                state.error = action.payload.error_description
            }
            
            
            
        })
        .addCase(signInUser.rejected,(state,action)=>{
            state.loading = false
        })

        //Signup

        .addCase(signUpUser.pending, (state, action) => {
            state.loading = true;
        })
        .addCase(signUpUser.fulfilled, (state, action) => {
            state.loading = false;
            if (action.payload.error) {
                state.error = action.payload.error_description;
            }
        })
        .addCase(signUpUser.rejected, (state, action) => {
            state.loading = false;
        });
    }
})

export const{addToken,addUser,logout} = authSlice.actions;



export default authSlice.reducer


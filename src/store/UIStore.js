import create from 'zustand'  

const useStore = create(set => ({
  route:null,
  sidebar:true,
  imgUser:null,
  initialCoordinate:[-85.28229,12.467416],
  ChangeRoute : (value)=>{
    set({route: value }) 
  }, 
  changeSidebar: () => set(state => ({ sidebar: !state.sidebar })),
  changeImage: (value)=>{
    set(state => {imgUser: value }) 
  }, 
  changeCoordinate: (value)=>{
    set({initialCoordinate: value }) 
  }, 
}))

export default useStore;
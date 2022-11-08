import create from 'zustand'

const useStore = create((set, get) => ({
  map: null,
  editMarker: false,
  coordinate: null,
  clickMap: false,
  listMarkers: null,
  marker: {}, 
  filterValues: {}, 
  editCoordinate: null, 
  getCoordinate: (clickCoordinate) => {
    const clickMap = get().clickMap
    if (clickMap) {
      set({ marker: {} })
      set({ coordinate: clickCoordinate })
      set({ clickMap: null })
      set({ imagesForm: [] })
      set({ editCoordinate: clickCoordinate })
    }

    set({ imagePreloadDelete: null })
    set({ imagesDelete: null })
  },
  initialFilters: (value) => {
    set({ filterValues: value })  
  }, 
  clickEventMap: () => set(state => ({ clickMap: !state.clickMap })),
  changeListMarkers: (value) => {
    set({ listMarkers: value })
  },
  modalCoordinateClose: () => {
    set({ coordinate: null })
    set({ clickMap: null }) 
    set({ editCoordinate: null }) 
  },
  modalEdit: (coordinatet, markert) => {
    set({ marker: markert })
    set({ coordinate: { lng: coordinatet[0], lat: coordinatet[1] } }) 
    set({ editCoordinate: { lng: coordinatet[0], lat: coordinatet[1] } }) 
  },
  changeMap: (value) => {
    set({ map: value })
  },
  filterMap: (key, value) => {
    const filter = get().filterValues
    if (key != 'business_types_id' && key != 'priceRange') {
      if (filter[key] != value) {
        filter[key] = value
      } else {
        filter[key] = null
      }
    } else {
      filter[key] = value
    }
    set({ filterValues: filter })
    set({ listMarkers: true })
  },
  setEditCoordinate: (value) => {
    set({ editCoordinate: value })
  },
  setImagesForm: (value) => {
    set({ imagesForm: value })
  }
}))

export default useStore;
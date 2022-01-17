import axios from "axios";
export default class SearchPicApi {

    constructor() {
        this.inputValue = '';
        this.page = 1;
    }

    async fetchPictures() {
    
    const fetchOptions = {
    key: '25249290-2b9b53acf0b6f227aa978e658',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: 40,
}
        const response = await axios.get(`https://pixabay.com/api/?key=${fetchOptions.key}&q=${this.inputValue}&image_type=${fetchOptions.image_type}&orientation=${fetchOptions.orientation}&safesearch=${fetchOptions.safesearch}&per_page=${fetchOptions.per_page}&page=${this.page}`);
        if (response.status === 200) {
            this.page += 1
        };
        return response.data;
        
}

    resetPage() {
        this.page = 1;
    }
    
}




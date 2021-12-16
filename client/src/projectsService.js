import axios from 'axios';
const url = 'http://localhost:8000/api/projects/'; //For development only
// const url = 'http://www.alejandropalomes.com/api/projects/'; //For development only
// const url = '/api/projects/';

class ProjectsService {
    static getProjects(){
        return new Promise ((resolve, reject) =>{
            try {
                axios.get(url + 'all')
                .then(res => {
                    resolve(res.data);
                });
                // const data = res.data
            } catch (err) {
                reject(err);
            }
        })
    }

    static getProjectById(id){
        return new Promise ((resolve, reject) =>{
            try {
                axios.get(url + id)
                .then(res => {
                    res.status === 200 ? resolve(res.data) : reject(res.statusText);
                });
                // const data = res.data
            } catch (err) {
                reject(err);
            }
        })
    }
}

export default ProjectsService;

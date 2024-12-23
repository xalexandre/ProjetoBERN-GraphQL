import { v4 } from 'uuid';

const Mutation = {
    addCity: (_, args, context) => {
        const { newCity } = args;
        const { cities } = context;
        console.log(newCity);

        // Gerando um UUID para o ID
        newCity.id = v4();

        // Definindo o timestamp em segundos
        newCity.atualizado = Math.floor(Date.now() / 1000);

        // Adicionando a nova cidade ao contexto
        cities.push(newCity);

        return newCity;
    },
    addPoint: (_, args, context) => {
        const { newPoint } = args;
        const { points } = context;

        // Gerando um UUID para o ID
        newPoint.id = v4();

        // Adicionando o novo ponto ao contexto
        points.push(newPoint);

        return newPoint;
    },
    updateCity: (_, args, context) => {
        const { city } = args;
        const { cities } = context;

        for (let i = 0; i < cities.length; i++) {
            const cidade = cities[i];
            if (cidade.id === city.id) {
                cities[i] = { ...cidade, ...city };
                
                // Timestamp em segundos
                cities[i].atualizado = Math.floor(Date.now() / 1000);
                
                return cities[i];
            }
        }
        return null;
    },
    deleteCity: (_, args, context) => {
        const { id } = args;
        const { cities } = context;
        
        const index = cities.findIndex(city => city.id === id);
        if (index !== -1) {
            cities.splice(index, 1);
            return true;
        }
        return false;
    }
};

export default Mutation;

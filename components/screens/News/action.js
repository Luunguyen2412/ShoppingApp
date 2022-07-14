export const GET_BUSINESS = 'GET_BUSINESS';
export const GET_ENTERTAINMENT = 'GET_ENTERTAINMENT';

export const getBusiness = () => {
  fetch(
    'https://newsapi.org/v2/top-headlines?country=in&sortBy=popularity&category=business&pageSize=20&apiKey=aabaa3d267d94f66bd0901b0b5855d82',
  )
    .then(response => response.json())
    .then(responseJson => {
      this.setState({data: responseJson.articles});
    })
    .catch(error => {
      console.error(error);
    })
    .finally(() => {
      this.setState({isLoading: false});
    });
};

export const getEntertainment = () => {
  try {
    return async dispatch => {
      const result = await fetch(
        'https://newsapi.org/v2/top-headlines?country=in&sortBy=popularity&category=entertainment&pageSize=20&apiKey=aabaa3d267d94f66bd0901b0b5855d82',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const json = await result.articles.json();
      if (json) {
        dispatch({
          type: GET_ENTERTAINMENT,
          payload: json,
        });
      }
    };
  } catch (error) {
    console.log(error);
  }
};

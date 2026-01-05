interface Film {
  id: string
  title: string
  director: string
  year: number
  image: string
  letterboxdUrl?: string
  rating?: number
  review?: string
  watchedDate?: string
}

interface Book {
  id: string
  title: string
  author: string
  year: number
  image: string
  rating?: number
  review?: string
  finishedDate?: string
  category: 'Currently reading' | 'Completed' | 'Planning to read'
}

interface Music {
  id: string
  title: string
  artist: string
  year?: number
  image: string
  spotifyUrl?: string
  type: 'album' | 'track' | 'playlist'
}

export function getAllFilms(): Film[] {
  return [
    {
      id: '1',
      title: 'The Godfather',
      director: 'Francis Ford Coppola',
      year: 1972,
      image: 'https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg',
      letterboxdUrl: 'https://letterboxd.com/film/the-godfather/',
      rating: 5,
      watchedDate: '2024-12-01'
    },
    {
      id: '2',
      title: 'Django Unchained',
      director: 'Quentin Tarantino',
      year: 2012,
      image: 'https://image.tmdb.org/t/p/w500/7oWY8VDWW7thTzWh3OKYRkWUlD5.jpg',
      letterboxdUrl: 'https://letterboxd.com/film/django-unchained/',
      rating: 5,
      watchedDate: '2024-11-20'
    },
    {
      id: '3',
      title: 'Pulp Fiction',
      director: 'Quentin Tarantino',
      year: 1994,
      image: 'https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg',
      letterboxdUrl: 'https://letterboxd.com/film/pulp-fiction/',
      rating: 5,
      watchedDate: '2024-11-15'
    },
    {
      id: '4',
      title: 'Kill Bill: Vol. 1',
      director: 'Quentin Tarantino',
      year: 2003,
      image: 'https://image.tmdb.org/t/p/w500/v7TaX8kXMXs5yFFGR41guUDNcnB.jpg',
      letterboxdUrl: 'https://letterboxd.com/film/kill-bill-vol-1/',
      rating: 5,
      watchedDate: '2024-10-28'
    },
    {
      id: '5',
      title: 'Training Day',
      director: 'Antoine Fuqua',
      year: 2001,
      image: 'https://a.ltrbxd.com/resized/film-poster/5/0/5/8/0/50580-training-day-0-460-0-690-crop.jpg?v=5ce5342625',
      letterboxdUrl: 'https://letterboxd.com/film/training-day/',
      rating: 4,
      watchedDate: '2024-10-10'
    },
  ]
}

export function getAllBooks(): Book[] {
  return [
    {
      id: '1',
      title: 'The Pragmatic Programmer',
      author: 'David Thomas, Andrew Hunt',
      year: 1999,
      image: 'https://m.media-amazon.com/images/I/71f1jieYHNL._SL1500_.jpg',
      rating: 5,
      finishedDate: '2024-12-01',
      category: 'Currently reading'
    },
    {
      id: '2',
      title: 'Clean Code',
      author: 'Robert C. Martin',
      year: 2008,
      image: 'https://m.media-amazon.com/images/I/71JpZHEGvWL._UF1000,1000_QL80_.jpg',
      rating: 5,
      finishedDate: '2024-10-15',
      category: 'Currently reading'
    },
    {
      id: '3',
      title: 'Atomic Habits',
      author: 'James Clear',
      year: 2018,
      image: 'https://m.media-amazon.com/images/I/81F90H7hnML._SL1500_.jpg',
      rating: 4,
      finishedDate: '2024-08-20',
      category: 'Completed'
    },
    {
      id: '4',
      title: 'Um apelo à consciência',
      author: 'Martin Luther King Jr.',
      year: 2006,
      image: 'https://m.media-amazon.com/images/I/81TqReGLPSL._SY522_.jpg',
      rating: 5,
      finishedDate: '2024-11-10',
      category: 'Completed'
    },
  ]
}

export function getAllMusic(): Music[] {
  return [
    {
      id: '1',
      title: "'Round Midnight",
      artist: 'Thelonious Monk',
      year: 1951,
      image: 'https://i.scdn.co/image/ab67616d00001e02c4c99d6b212f741ba28c5a61',
      type: 'track',
      spotifyUrl: 'https://open.spotify.com/track/1wl5b2lw3YagQtZiYZbQWP'
    },
    {
      id: '2',
      title: 'So What',
      artist: 'Miles Davis',
      year: 2007,
      image: 'https://i.scdn.co/image/ab67616d00001e020ebc17239b6b18ba88cfb8ca',
      type: 'track',
      spotifyUrl: 'https://open.spotify.com/track/4vLYewWIvqHfKtJDk8c8tq'
    },
    {
      id: '3',
      title: 'Summertime',
      artist: 'Charlie Parker',
      year: 1957,
      image: 'https://i.scdn.co/image/ab67616d00001e0214e289fe668cffe13b4d11f1',
      type: 'track',
      spotifyUrl: 'https://open.spotify.com/track/6cU4urQRUieTBH08yKHAqj'
    },
    {
      id: '4',
      title: 'Body and Soul',
      artist: 'Coleman Hawkins',
      year: 1996,
      image: 'https://i.scdn.co/image/ab67616d00001e021c81e5a1581f1ee86535c40f',
      type: 'track',
      spotifyUrl: 'https://open.spotify.com/track/2xm9ihELo6xwrRKrBbPql9'
    },
  ]
}

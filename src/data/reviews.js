// Fake but charming reviews, keyed by product id. If missing, `defaultReviews` is used.
const defaultReviews = [
  { id: 'r1', name: 'Mia K.', rating: 5, date: '3 days ago', title: 'My kid lost her mind', text: 'Opened the box, assembled in 4 minutes, my daughter has been screaming with joy for two hours. Worth every penny.' },
  { id: 'r2', name: 'Dad of 3', rating: 5, date: '1 week ago', title: 'Built like a tank', text: 'Three boys, a dog, and a birthday party. Still looks brand new.' },
  { id: 'r3', name: 'Priya S.', rating: 4, date: '2 weeks ago', title: 'So cute', text: 'Adorable and well-made. Took off one star because I stepped on it in the dark. My fault not theirs.' },
]

export const REVIEWS = {
  'p-castle-rainbow': [
    { id: 'cr1', name: 'Amber W.', rating: 5, date: '2 days ago', title: 'Best birthday ever', text: 'Seven 6-year-olds, one backyard, total chaos. The castle survived and so did we.' },
    { id: 'cr2', name: 'Jessie', rating: 5, date: '1 week ago', title: 'Fan is louder than expected', text: 'The Turbo-Whoosh is no joke, it lives up to the name. Castle itself is beautiful.' },
    { id: 'cr3', name: 'M. Thompson', rating: 4, date: '2 weeks ago', title: 'Small note on packing', text: 'Packing it back up takes practice. Kids love it though.' },
    { id: 'cr4', name: 'Taylor G.', rating: 5, date: '1 month ago', title: 'Neighbors jealous', text: 'Three neighbors asked where we got it. Sent them all here. You owe me a coupon.' },
  ],
  'p-pool-whale': [
    { id: 'pw1', name: 'Sandeep K.', rating: 5, date: '4 days ago', title: 'Wally is a menace', text: 'The water spout absolutely sprays you in the face when you lean over it. My 5-year-old thinks this is the funniest thing ever invented.' },
    { id: 'pw2', name: 'Beth', rating: 5, date: '2 weeks ago', title: 'Holds up great', text: 'Been out in the yard for 3 weeks with zero issues. Drain plug is convenient.' },
  ],
  'p-plush-bear': [
    { id: 'pb1', name: 'Laura V.', rating: 5, date: '5 days ago', title: 'Soft beyond reason', text: 'Marmalade is now my toddlers third parent.' },
    { id: 'pb2', name: 'Jen', rating: 5, date: '3 weeks ago', title: 'Weighted is a big deal', text: 'My sensory-sensitive kiddo loves the weighted bottom. Sits up on its own on the bookshelf.' },
    { id: 'pb3', name: 'Kay', rating: 5, date: '1 month ago', title: 'Ordered two', text: 'One for my daughter, one for me. No regrets.' },
  ],
  'p-xylophone': [
    { id: 'xy1', name: 'Noah B.', rating: 5, date: '1 week ago', title: 'Actually tuned', text: 'I am a music teacher. This is actually in tune, which is rare at this price.' },
  ],
}

export const getReviews = (productId) => REVIEWS[productId] || defaultReviews

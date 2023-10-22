# Social Valley Readme

## What problem are we trying to solve?

- Information asymmetry in the Social-Fi space
- Proliferation of Social-Fi scammers and numerous bots
- Fragmentation of the social graph

## Detailed Problem Description

### Information Asymmetry in Social-Fi

Currently, many users are unable to know what benefits they can gain from following on Social-Fi projects like Friend.tech without purchasing a key or paying. Projects like Friend.tech and its forks provide only limited information about prices and follow/follower counts, making it nearly impossible for users to make informed decisions without access to other buyers' experiences.

### Proliferation of Social-Fi Scammers and Numerous Bots

As mentioned earlier, projects like Friend.tech and its forked versions provide limited information, leading to the emergence of numerous scammers and bots. These bots attempt to manipulate follower counts and key values through various means. They often deceive users by impersonating famous individuals on social media platforms, leading to potential financial losses for unsuspecting buyers.

### Fragmentation of the Social Graph

Moreover, the various Social-Fi platforms on different chains exacerbate this confusion, leading to a fragmented social graph. This complicates data integration for future dApps and undermines the scalability of the overall Social-Fi ecosystem. A unified social graph is crucial for future expansion and development.

## How are we addressing these challenges?

The primary functionality of our project is to assist users when they want to follow someone and when they want to evaluate the user they are following. Users can access information about the user they intend to follow through web3 storage and [web.bio](http://web.bio) API. This information includes follow/follower counts, key prices, and more from various social-fi platforms across different chains. Additionally, the [web.bio](http://web.bio) API presents user ratings and Vely points, providing users with intuitive metrics for decision-making.

<img src= "https://github.com/djm07073/social-valley/assets/89185836/32e25698-1f66-49c6-a00e-dfd2eae855a3"  width="300" height="400">

On the evaluation page, users can express their preferences with likes/dislikes and provide comments. This data accumulates within our social graph, further enhancing our database.

<img src = "https://github.com/djm07073/social-valley/assets/89185836/b001bd51-05ca-4c18-94c4-d7a01f1ed26c"  width="300" height="400">

## Technical Details

### Building a Decentralized Social Graph Easily Implemented with [web3.bio](http://web3.bio) API

Next.ID serves as a secure gateway that connects various web2.0 and web3.0 identifiers, including wallets, Twitter profiles, ENS names, and Lens profiles. This infrastructure allows us to provide users with safer and verified information more easily. Utilizing [web3.bio](http://web3.bio) API provides us with more information about users who have registered with Next.ID, encouraging users to undergo a verification process on web2 SNS platforms. This helps us build a richer and more stable social graph and create a virtuous cycle.

### Constructing a Decentralized Social Graph using ChainLink Automation and web3 storage

To achieve maximum decentralization in our social graph, we implement a process where, every 15 minutes, we use ChainLink automation to log the states (follower count, following count, key values) of registered accounts (addresses) within our app. This data is used to create balanced Merkle roots for accounts with state changes, as well as skewed Merkle roots. These roots are concatenated and hashed to define a new skewed Merkle root, which is stored in the contract storage. An event is triggered for the information related to state changes, which is listened to by our server and uploaded to web3 storage. The transparency of this process, alongside the verification capability of Merkle roots, ensures decentralization in our social graph.

## Valley Point Detail

Valley Point is a metric created to provide users with an intuitive indicator to aid in their decision-making process and incentivize users who desire more followers.

We use the following ranking for personal trust weight: Mask Network > User count ranking ([friend.tech](http://friend.tech) > stars_arena > post.tech).

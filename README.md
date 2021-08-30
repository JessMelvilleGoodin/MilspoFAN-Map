# MilspoFAN-Map
MVP v 0.1:
Set up a web app using DRF/ Django and React that can:
  CRUD: Users
        Recommendations
        MemberProfile
        MemberLocations -> MemberProfile
        ArtisticDiscipline (constrained choices created only by superuser)
  Display MemberProfile and Recommendation: 
    - ListView
    - Detail view for MemberProfile and Recommendation


v 1.1:
Additional Features:
  CRUD Comments on Reccomendations (Any User)
  CRUD Announcement on MemberProfile (User's Own Profile only)
  Display MemberProfile and Recommendations: 
    - ListView of Reccomendations Filter by Location tag
    - ListView Filter of Reccomendations by discipline
    - ListView Filter of MemberProfile by discipline
    - Include comments on Reccomendation Detail
    - Include Announcement on MemberProfile Detail

v 2:
  Validate location fields using GoogleMaps API (for MemberProfile)
  Restrict Location to city/base/state/country not addresss
  Display Recommendations on a Map
  Display MemberProfile on a Map

v 3:
  Scrape Blog Posts from WordPress REST API
  Display Blog Posts on the Map
  Add BlogPosts to appropriate MemberProfile

v 4:
  Add Virtual Resources/Recommendations


  MODELS:
  User v 0.1 (BuiltIn)
    id -> MemberProfile
    username
    password

  MemberProfile v 0.1
    id (<- FROM User)
    artist_display_name
    name_on_blog(hidden)
    email
    artist_bio
    website
    image
    hashtags
    artistic_disciplines FK -> ArtisticDisciplines (ManyToMany)
    (<- Many from BlogPostInfo) 
    (<- Many from MemberLocation)
    (<- Many from SocialLink>)

  MemberSocialLink
    member_id FK -> MemberProfile
    social_url

  MemberLocation v 0.1
    user_id
    year_arrived (required)
    year_departed (optional)
    location

  ArtisticDiscipline v 0.1
    name
    (members <- FROM MemberProfile ManyToMany)

  Reccomendation v 0.1
    rec_name
    rec_description
    rec_notes
    rec_hashtags
    rec_location
    rec_website
    rec_discipline(s) (<- ManyToMany with ArtisticDisciplines)
    reccomended_by (<- FROM User)

  RecComment v 1.1
    member_id <- MemberProfile.user_id
    reccomendation_id <- >Reccomendation
    text_body

  Announcement v 1.1
    member_id <- MemberProfile.user_id
    headline
    text_body
    hashtags

  BlogPostInfo v 3
    blogpost_link
    blogpost_title
    blogpost_location
    blogpost_artist_name?(may be redundant with user_id)
    user_id FK -> User

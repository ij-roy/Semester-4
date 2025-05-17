import streamlit as st
import pandas as pd
import backend  # Make sure backend.py is in the same folder or importable

# Load profiles from backend
profiles_df = backend.profiles_df

# Streamlit page setup
st.set_page_config(page_title="Friend Recommender", layout="centered")
st.title("🤝 Friend Recommendation System")

# Sidebar: User input
st.sidebar.header("Select User")

# User ID input instead of dropdown (faster for large datasets)
user_input = st.sidebar.text_input("Enter a User ID", value="1")

# Validate input
try:
    selected_user_id = int(user_input)
    if selected_user_id not in profiles_df['user_id'].values:
        st.sidebar.error("User ID not found in dataset.")
        st.stop()
except ValueError:
    st.sidebar.error("Please enter a valid numeric User ID.")
    st.stop()

# Show selected user profile
st.write(f"### Profile for User {selected_user_id}")
user_profile = profiles_df[profiles_df['user_id'] == selected_user_id]
st.dataframe(user_profile)

# Button to trigger recommendations
if st.button("Find Friends"):
    recommendations = backend.get_recommendations(selected_user_id)

    if not recommendations.empty:
        st.write("### 🔗 Top Friend Recommendations")
        st.dataframe(
            recommendations[['user_id', 'final_score'] + 
            [col for col in recommendations.columns if col not in ['user_id', 'final_score']]]
        )
    else:
        st.warning("No recommendations found.")
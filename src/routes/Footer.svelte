<footer>
  <div class="container footer-container">
    <div>
      &copy; 2024 by <a class="hover-underline" target="_blank" href="https://twitter.com/shunyutang">Andy Tang</a>
    </div>

    <div class="links">
      <a class="hover-underline" href="/terms">Terms</a>
      <a class="hover-underline" href="/privacy">Privacy</a>
      <a class="hover-underline" href="/contact">Contact</a>
      <a class="hover-underline" href="/about">About</a>
    </div>
  </div>
</footer>

<style>
  .footer-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 1rem;
    padding-bottom: 2rem;
    font-weight: 300;
    font-size: 0.9rem;
  }

  .links > * + * {
    margin-left: 1em;
  }

  @media (max-width: 768px) {
    .footer-container {
      flex-direction: column;
    }

    .links {
      margin-top: 1rem;
    }
  }
</style>

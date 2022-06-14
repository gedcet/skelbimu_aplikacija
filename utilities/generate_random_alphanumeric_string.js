//generates random aphanumeric string
const generate_random_alphanumeric_string = (parameter_length) =>
{
    const arr_alphanumerics = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

    let text = ""

    let random_index

    for (let i = 0; i < parameter_length; i++)
    {
        random_index = Math.floor(Math.random() * arr_alphanumerics.length)
        text += arr_alphanumerics[random_index]
    }

    return text
}

module.exports = generate_random_alphanumeric_string